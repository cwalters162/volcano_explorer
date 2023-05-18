import {z} from "zod";

export const ZUserSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    won: z.number().int(),
    loss: z.number().int(),
})

type TUser = z.infer<typeof ZUserSchema>

class User implements TUser {
    id: number
    name: string
    won: number
    loss: number

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
        this.won = 0
        this.loss = 0
    }
}

export default User