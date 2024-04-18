import MenuService from "./Data/MenuService"
import MenuPresenter from "./Presentation/MenuPresenter"

class App
{
    #menuService
    #menuPresenter

    constructor()
    {
        this.#menuService = new MenuService()
    }

    setMenuPresenter(presenter)
    {
        this.#menuPresenter = presenter
    }

    static async load(ev)
    {
        const app = new App()

        app.setMenuPresenter(
            new MenuPresenter(document.body, await app.#menuService.getDrinks())
        )
    }
}