import MenuService from "./MenuService.js"
import MenuPresenter from "./MenuPresenter.js"

export default class CoffeeShop
{
    #service = new Map()
    #presenter = new Map()

    constructor()
    {
        this.#service.set(`menu`, new MenuService())

        window.addEventListener(`load`, this.onLoad.bind(this))
    }

    async onLoad(ev)
    {
        this.#presenter.add(
            `menu`,
            new MenuPresenter(
                document.body,
                await this.#service.get(`menu`).getDrinks()
            )
        )
    }
}