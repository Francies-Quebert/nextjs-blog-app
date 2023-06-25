declare export type PostType = { prompt: string, tag: string }


type UserType = {
    _id?: string,
    id?: string
    username?: string | null
    email?: string | null
    image?: string | null
}
declare export interface SessionExtend {
    user?:UserType
    expires: ISODateString
}

declare export type allPostType = {
    _id: string,
    prompt: string,
    creator: UserType,
    tag: string,

}