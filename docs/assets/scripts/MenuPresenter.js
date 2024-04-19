import Event from "./UI/Event.js"
import Menu from "./UI/Menu.js"

export default class MenuPresenter extends Event
{
    #menu

    constructor(parentNode, drinkTypes)
    {
        super()

        const type = drinkTypes[0].id

        this.#menu = new Menu(parentNode, {type})
        this.#menu.render(drinkTypes)
        this.#menu.on(`menu.change`, this.onMenuChange.bind(this))
    }

    async onMenuChange(ev)
    {
        const type = ev.detail.type

        this.emit(`drink.type.change`, {type})
    }
}