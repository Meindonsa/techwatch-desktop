import { marked } from 'marked'
import { computed, type Ref } from 'vue'

export function useMarked(content: Ref<string | null>) {
  return computed(() => {
    if (!content.value) return ''
    return marked(content.value)
  })
}
