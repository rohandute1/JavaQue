import { MODULES } from './modules.js'
import { BASICS_TOPICS } from './topics-basics.js'
import { OOP_TOPICS } from './topics-oop.js'
import { COLLECTIONS_TOPICS } from './topics-collections.js'
import { EXCEPTIONS_TOPICS } from './topics-exceptions.js'
import { JAVA8_TOPICS } from './topics-java8.js'
import { MULTITHREADING_TOPICS } from './topics-multithreading.js'
import { ADVANCED_TOPICS, INTERVIEW_TOPICS } from './topics-advanced.js'

// Merge all topics into one lookup map
export const TOPICS = {
  ...BASICS_TOPICS,
  ...OOP_TOPICS,
  ...COLLECTIONS_TOPICS,
  ...EXCEPTIONS_TOPICS,
  ...JAVA8_TOPICS,
  ...MULTITHREADING_TOPICS,
  ...ADVANCED_TOPICS,
  ...INTERVIEW_TOPICS,
}

export { MODULES }

// Helper: get module for a topic id
export function getModule(topicId) {
  const topic = TOPICS[topicId]
  if (!topic) return null
  return MODULES.find(m => m.id === topic.module)
}

// Helper: get prev/next topic
export function getAdjacentTopics(topicId) {
  const allTopicIds = MODULES.flatMap(m => m.topics)
  const idx = allTopicIds.indexOf(topicId)

  const makeEntry = (id) => {
    if (!id) return null
    const mod = MODULES.find(m => m.topics.includes(id))
    return { id, color: mod?.color || '#f97316' }
  }

  return {
    prev: makeEntry(idx > 0 ? allTopicIds[idx - 1] : null),
    next: makeEntry(idx < allTopicIds.length - 1 ? allTopicIds[idx + 1] : null),
  }
}

// Helper: get all topics flat
export function getAllTopics() {
  return MODULES.flatMap(m =>
    m.topics.map(id => ({ id, ...TOPICS[id], moduleLabel: m.label, moduleColor: m.color, moduleIcon: m.icon }))
  ).filter(t => t.title)
}
