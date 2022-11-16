import { IResolvers } from 'mercurius'
import { MutationResolvers } from '../generated'

type Mutations = {
    add: MutationResolvers['add']
}

export const mutations: IResolvers<Mutations> = {
    Mutation: {
        add: async (_, { x, y }) => {
            return x + y
        },
    },
}
