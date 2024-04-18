import HttpService from "./Data/HttpService.js"
import Repository from "./Data/Repository.js"
import DrinkType from "./Domain/DrinkType.js"

export default class MenuService extends HttpService
{
    #uri = `/coffee-shop/docs/assets/data/drinks.json`
    #menu

    constructor()
    {
        super()

        this.#menu = Repository.createSessionRepository(`menu`)
    }

    async getDrinks()
    {
        let drinks = this.#menu.get(`drinks`)

        if (null === drinks || 0 === drinks.length)
        {
            const response = await this.get(this.#uri)

            drinks = 200 === response.status ? response.body : []

            this.#menu.set(`drinks`, drinks.map(DrinkType.fromObject))
        }

        return drinks
    }
}
