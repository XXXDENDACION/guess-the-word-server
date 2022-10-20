import { IResolvers } from "mercurius";
import { MutationResolvers } from "../generated";

const add: MutationResolvers['add'] = async function add(
    _,
    {x, y}
) {
    const sum = x +  y;
    return sum;
}

const createUser: MutationResolvers['createUser'] = async function createUser(
    _,
    { user },
    context
) {
    const newUser = await context.prisma.user.create({
        data: {
            ...user
        }
    })

    console.log(newUser);
    return newUser;
}

export const mutations: IResolvers = {
    Mutation: {
        add,
        createUser
    }
}