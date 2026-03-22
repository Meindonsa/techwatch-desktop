import { defineStore } from 'pinia'
import UseWatcher from '@/shared/api/Watcher.ts'
import { SourcesDao } from '@/core/database/SourceDao.ts'
import { ref } from 'vue'
import { ArticleDao } from '@/core/database/ArticleDao.ts'
import type { Article, Source } from '@/core/database/db.ts'

export const useScrappingStore = defineStore('scrapping', () => {
  const useWatcher = UseWatcher();
  const state = ref<string>("");

  function finalState(message: string){
    state.value = message
    setTimeout(() => {
      state.value = ''
    }, 800)
  }

  const scrap = (feed_url: string): void => {
    SourcesDao.getByFeedUrl(feed_url)
      .then((source: Source | undefined) => {
        if (source == undefined) return;
        state.value = `Analyse de ${source.name} ...`;
        useWatcher.scrape(source.feed_url)
          .then(async (watcher) => {
            const insert: boolean = await insertArticles(source.id, watcher.data.articles)
            const message: string = insert ? 'Terminé ...' : 'Aucun nouvel article ...';
            await SourcesDao.markFetched(source.id||0);
            finalState(message)
          })
          .catch(() => {})
      })
      .then(() => {
        throw new Error("Could not find scraping feed feed")
      })
  }

  async function insertArticles(source: any, data: any[]){
    const articles: Omit<Article, 'id' | 'saved_at'>[] = [];
    if(data.length == 0) return false;
    data.forEach((item) => {
      articles.push({
        url: item.link,
        source_id: source,
        title: item.title,
        summary: null,
        content: item.summary,
        author: item.author,
        thumbnail_url: item.image,
        published_at: item.date,
      })
    })
    try {
      await ArticleDao.bulkAddIfNotExists(articles)
      return true
    } catch {
      return false
    }
  }

  return {
    state,


    scrap,
  }
})
