import MenuService from "./MenuService.js"
import MenuPresenter from "./Presentation/MenuPresenter.js"

class App
{
    #menuService
    #menuPresenter

    constructor(drinks)
    {
        this.#menuService = new MenuService()
        this.#menuPresenter = new MenuPresenter(document.body, drinks)
    }

    static async load(ev)
    {
        const app = new App(await app.#menuService.getDrinks())
    }
}