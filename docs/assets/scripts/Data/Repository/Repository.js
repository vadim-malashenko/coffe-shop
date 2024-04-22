import Event from "../../Event.js"

export default class Repository
{
    #key
    #value = null
    #storage
    #service

    constructor(key, storage, service)
    {
        if ( ! Storage.isStorage(storage))
        {
            throw new Error(Storage.ERROR_INVALID_STORAGE)
        }

        this.#key = key
        this.#storage = storage
        this.#service = service
    }

    get(key)
    {
        return this.getByID(key)
    }

    set(key, value)
    {
        const drinks = this.getAll()
        drinks[key] = value

        this.#value = drinks
        this.#storage.create(this.#key, this.#value)
    }

    unset(key)
    {
        const drinks = this.getAll()
        delete drinks[key]

        this.#value = drinks
        this.#storage.set(this.#key, this.#value)
    }

    getAll()
    {
        return this.#value ?? (this.#value = this.#storage.read(this.#key) ?? this.#service.get(this.#key))
    }

    setAll(value)
    {
        this.#value = value
        this.#storage.create(this.#key, this.#value)
    }

    unsetAll()
    {
        this.#storage.delete(this.#key)
    }

    find(keyName, keyValue)
    {
        return this
            .getAll()
            .filter(data => keyValue === data[keyName])[0]
            ?? null
    }
}