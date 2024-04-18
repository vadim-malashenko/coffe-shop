import Component from "./Component.js"

export default class Menu extends Component
{
    constructor(parentNode, state)
    {
        super(parentNode, `menu`, state)
        
        this.node.addEventListener(`click`, this.onClick.bind(this))

        this.emit(`menu.load`)
    }

    async onClick(ev)
    {
        const li = `li` === ev.target.tagName
            ? ev.target
            : ev.target.closest(`li`)
        
        li.parentNode.dataset.type = li.dataset.id
        
        this.emit(`menu.change`, {type: li.dataset.id})
    }

    template(drinkType)
    {
        const name = `<p>${drinkType.name}</p>`
        const img = `<img src="/coffee-shop/docs/assets/images/${drinkType.img.src}" alt="${drinkType.img.alt}">`
        
        return `<li data-id="${drinkType.id}">${img(drinkType)}${name(drinkType)}</li>`
    }
}