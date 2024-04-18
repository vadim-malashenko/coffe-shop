import HttpService from "./HttpService"
import Repository from "./Repository"

class MenuService extends HttpService
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

            this.#menu.set(`drinks`, drinks)
        }

        return drinks
    }
}