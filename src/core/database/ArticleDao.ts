import type { GetArticlesOptions } from '@/core/database/DbType.ts'
import { type Article, db } from '@/core/database/db.ts'
import { FeedDao } from '@/core/database/FeedDao.ts'

export const ArticleDao = {
  async getAll({ sourceId, limit, offset }: GetArticlesOptions = {}): Promise<{
    articles: Article[]| any[]
    total: number
  }> {
    let query = sourceId
      ? db.articles.where('feed_id').equals(sourceId).reverse()
      : db.articles.orderBy('fetched_at').reverse()

    const total = await query.count()

    if (offset) query = query.offset(offset) // offset d'abord
    if (limit) query = query.limit(limit) // limit ensuite

    const articles = await query.toArray()

    const articlesWithFeed = await Promise.all(
      articles.map(async (article) => {
        const feed = await db.feeds.get(article.feed_id)
        return { ...article, feed }
      }),
    )
    return { articles: articlesWithFeed, total }
  },

  getByUrl(url: string): Promise<Article | undefined> {
    return db.articles.where('url').equals(url).first()
  },

  /**
   * Insère un article en ignorant silencieusement les doublons (url unique).
   * Retourne l'id inséré ou null si doublon.
   */
  async addIfNotExists(article: Article): Promise<number | null> {
    try {
      return await db.articles.add(article)
    } catch (e) {
      if ((e as Error).name === 'ConstraintError') return null
      throw e
    }
  },

  /**
   * Insère un tableau d'articles en ignorant les doublons.
   * Retourne le nombre de nouveaux articles insérés.
   */
  async bulkAddIfNotExists(articles: Article[]): Promise<number> {
    let inserted = 0
    for (const article of articles) {
      const id = await ArticleDao.addIfNotExists(article)
      if (id !== null) inserted++
    }
    return inserted
  },

  countBySource(sourceId: number): Promise<number> {
    return db.articles.where('source_id').equals(sourceId).count()
  },

  async find(id: number) {
    const article: any = await db.articles.where('id').equals(id).first()
    if (article == undefined) return null
    article.feed = await FeedDao.getById(article?.feed_id)
    return article;
  },
}
