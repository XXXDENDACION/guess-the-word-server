import 'mercurius'
import { buildContext } from '../src/graphql/mercuriusContext'

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
    interface MercuriusContext
        extends PromiseType<ReturnType<typeof buildContext>> {}
}
