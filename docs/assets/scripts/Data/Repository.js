import Storage from "./Storage.js"

export default class Repository
{
    #storage

    constructor(storage)
    {
        this.#storage = storage
    }

    get(key)
    {
        return this.#storage.read(key)
    }

    set(key, value)
    {
        this.#storage.create(key, value)
    }

    unset(key)
    {
        this.#storage.delete(key)
    }

    static createSessionRepository(id)
    {
        return new Repository(Storage.createSessionStorage(id))
    }

    static createLocalRepository(id)
    {
        return new Repository(Storage.createLocalStorage(id))
    }
}