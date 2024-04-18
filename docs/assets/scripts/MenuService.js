import HttpService from "./Data/HttpService.js"
import Repository from "./Data/Repository.js"
import DrinkType from "./Domain/DrinkType.js"

export default class MenuService extends HttpService
{
    #uri = `/coffee-shop/docs/assets/data/drinks.json`
    #menu

    constructor()
    {
        this.#menu = Repository.createSessionRepository(`menu`)
    }

    async getDrinks()
    {
        let drinks = this.#menu.get(`drinks`)

        if (null === drinks)
        {
            const response = await this.get(this.#uri)

            drinks = 200 === response ? response.body : []

            this.#menu.set(`drinks`, drinks.map(DrinkType.fromObject))
        }

        return drinks
    }
}