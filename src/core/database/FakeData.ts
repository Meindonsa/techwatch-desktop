import type { Article } from '@/core/database/db.ts'

export const fakeArticles: Article[] | any[] = [
  {
    url: 'http://github.com',
    source_id: 1,
    title: 'GitHub',
    summary: 'Ça parle de google',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Boris Axel',
    thumbnail_url: null,
    published_at: new Date().getTime(),
  },
  {
    url: 'https://www.apple.com/fr',
    source_id: 1,
    title: 'Apple',
    summary: 'Site de lorem ipsum',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Boris Axel',
    thumbnail_url: null,
    published_at: new Date().getTime(),
  },
  {
    url: 'https://angular.fr/',
    source_id: 1,
    title: 'Angular fr',
    summary: 'Build in a weekend',
    content:
      'Supabase is the Postgres development platform.\n Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.',
    author: 'Boris Axel',
    thumbnail_url: null,
    published_at: new Date().getTime(),
  },
  {
    url: 'https://fr.vue.org/',
    source_id: 1,
    title: 'Vue fr',
    summary: 'Build in a weekend',
    content:
      'Supabase is the Postgres development platform.\n Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.',
    author: 'Boris Axel',
    thumbnail_url: null,
    published_at: new Date().getTime(),
  },
]