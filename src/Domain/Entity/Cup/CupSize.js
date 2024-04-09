class CupSize
{
    static SMALL = 200
    static MEDIUM = 300
    static LARGE = 400

    #cupSize
    #cupSizeUnit

    constructor(cupSize, cupSizeUnit = `ml`)
    {
        this.#cupSize = cupSize
        this.#cupSizeUnit = cupSizeUnit
    }
}