class Drink
{
    static type

    #name
    #cup

    constructor(name, cup)
    {
        this.#name = name
        this.#cup = cup ?? new Cup(this.getType(), new CupSize(CupSize.MEDIUM))
    }

    getName()
    {
        return this.#name
    }

    getCup()
    {
        return this.#cup
    }

    getType()
    {
        return this.constructor.type
    }
}