export default class Storage
{
    static ERROR_INVALID_STORAGE =
        `Storage is not available on this device: `
    
    #id
    #storage

    constructor(id, storage)
    {        
        if (`Storage` !== storage[Symbol.toStringTag])
        {
            throw new Error(
                this.constructor.ERROR_INVALID_STORAGE
                    + storage.constructor.name
            )
        }

        this.#id = id
        this.#storage = storage
    }

    create(key, value)
    {
        this.#storage.setItem(this.key(key), this.valueSet(value))
    }

    read(key)
    {
        return this.valueGet(this.#storage.getItem(this.key(key)))
    }

    update(key, value)
    {
        this.create(key, value)
    }

    delete(key)
    {
        this.#storage.clear(this.key(key))
    }

    key(key)
    {
        return `${this.#id}_${key}`
    }

    valueGet(value)
    {
        return JSON.parse(value)
    }

    valueSet(value)
    {
        return JSON.stringify(value)
    }

    static factory(type)
    {
        let storage

        try
        {
            storage = window[type]

            const test = `___${type}___test___`

            storage.setItem(test, test)
            storage.removeItem(test)

            return id => new Storage(id, storage)
        }
        catch (e)
        {
            return (
                e instanceof DOMException
                && (
                    22 === e.code
                    || 1014 === e.code
                    || e.name === `QuotaExceededError`
                    || e.name === `NS_ERROR_DOM_QUOTA_REACHED`
                )
                && storage
                && 0 < storage.length
            )
                ? id => new Storage(id, storage)
                : null
        }
    }

    static createSessionStorage(id)
    {
        return Storage.factory(`sessionStorage`)(id)
    }

    static createLocalStorage(id)
    {
        return Storage.factory(`localStorage`)(id)
    }
}