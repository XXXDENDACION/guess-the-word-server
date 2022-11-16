import { IResolvers } from 'mercurius'
import { QueryResolvers } from '../generated'

type Queries = {
    dogs: QueryResolvers['dogs']
}

export const queries: IResolvers<Queries> = {
    Query: {
        dogs: async (_, { word }) => `Wow! ${String(word)}`,
    },
}
