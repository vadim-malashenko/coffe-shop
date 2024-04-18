import Menu from "./UI/Menu.js"

export default class MenuPresenter extends Event
{
    #menu

    constructor(parentNode, drinkTypes)
    {
        super()
        
        const type = drinkTypes[0].id

        this.#menu = new Menu(parentNode, {type})
        this.#menu.on(`menu.load`, ev => this.view(drinkTypes))
        this.#menu.on(`menu.change`, this.onMenuChange.bind(this))
    }

    async view(drinkTypes)
    {
        this.#menu.render(drinkTypes)
    }

    async onMenuChange(ev)
    {
        const type = ev.detatil.type

        this.emit(`drink.type.change`, {type})
    }
}