class Cup
{
    #drinkType
    #cupSize
    #requireStraw

    constructor(drinkType, cupSize, requireStraw = false)
    {
        this.#drinkType = drinkType
        this.#cupSize = cupSize
        this.#requireStraw = requireStraw
    }
}