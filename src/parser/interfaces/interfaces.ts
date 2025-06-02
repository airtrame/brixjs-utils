export type TrameStatusCode = 200 | 400 | 401 | 403 | 404 | 500
export type TrameActorReturn = [any, TrameStatusCode]
export type TrameActorSkill<I = any> = (instructions?: I, context?: any) => Promise<TrameActorReturn>;
export type TrameActor<T extends Record<string, any> = any> = { [K in keyof T]: TrameActorSkill<T[K]>;};