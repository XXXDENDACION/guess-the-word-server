import { IResolvers } from "mercurius";

export const queries: IResolvers = {
    Query: {
        dogs: async (_, { word }) => {
            return `Wow! ${word}`;
        }
    }
}