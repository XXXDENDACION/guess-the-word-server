import type { IResolvers, MercuriusContext } from 'mercurius'
import type { MutationResolvers } from '../../graphql/generated'

type UserMutations = {
    createUser: MutationResolvers['createUser']
}

export const userMutations: IResolvers<UserMutations> = {
    Mutation: {
        createUser: async (_, { user }, context: MercuriusContext) => {
            const newUser = await context.prisma.user.create({
                data: {
                    ...user,
                },
            })

            console.log(newUser)
            return newUser
        },
    },
}
