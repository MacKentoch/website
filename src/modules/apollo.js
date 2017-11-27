/* eslint-disable no-underscore-dangle */
import { toIdValue } from 'apollo-utilities'

export const dataIdFromObject = result => {
  if (result.__typename) {
    if (result.link !== undefined) {
      return `${result.__typename}:${result.link}`
    }
    if (result.slug !== undefined) {
      return `${result.__typename}:${result.slug}`
    }
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`
    }
  }
  return null
}

export const cacheResolvers = {
  Query: {
    session: (_, { id }) =>
      toIdValue(dataIdFromObject({ id, __typename: 'Session' })),
    article: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Article' })),
  },
}
