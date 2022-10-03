import { IResolvers } from "mercurius";
import { MutationResolvers } from "../generated";

const add: MutationResolvers['add'] = async function add(
    _,
    {x, y}
) {
    const sum = x +  y;
    return sum;
}

export const mutations: IResolvers = {
    Mutation: {
        add
    }
}