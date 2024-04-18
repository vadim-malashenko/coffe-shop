export default class Drink
{
    #id
    #type
    #name
    #img

    constructor(id, type, name, img)
    {
        this.#id = id
        this.#type = type
        this.#name = name
        this.#img = img
    }

    get id()
    {
        return this.#id
    }

    get type()
    {
        return this.#type
    }

    get name()
    {
        return this.#name
    }

    get img()
    {
        return this.#img
    }
}