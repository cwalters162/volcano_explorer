type TUser = {
    id: number,
    name: string,
    password: string,
    won: number,
    loss: number,
}

class User implements TUser {
    id: number
    name: string
    password: string
    won: number
    loss: number

    constructor(id: number, name: string, password: string) {
        this.id = id
        this.name = name
        this.password = password
        this.won = 0
        this.loss = 0
    }
}

export default User