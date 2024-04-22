export default class Storage
{
    static ERROR_INVALID_STORAGE =
        `Storage is not available on this device: `
    
    #storage

    constructor(storage)
    {
        this.#storage = storage
    }

    create(key, value)
    {
        this.#storage.setItem(key, JSON.stringify(value))
    }

    read(key)
    {
        return JSON.parse(this.#storage.getItem(key))
    }

    update(key, value)
    {
        this.create(key, value)
    }

    delete(key)
    {
        this.#storage.clear(key)
    }

    static isStorage(storage)
    {
        return `Storage` === storage[Symbol.toStringTag]
    }

    static isAvailable(storageType)
    {
        let storage

        try
        {
            storage = window[storageType]

            const test = `___${storageType}___test___`

            storage.setItem(test, test)

            return test === storage.getItem(test)
        }
        catch (e)
        {
            return (
                e instanceof DOMException
                && (
                    e.name === `QuotaExceededError`
                    || e.name === `NS_ERROR_DOM_QUOTA_REACHED`
                )
                && storage
                && 0 < storage.length
            )
        }
    }
}