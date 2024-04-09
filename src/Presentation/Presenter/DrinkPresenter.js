export default class DrinkPresenter extends HTMLElement
{
    static UI = {
        selectDrink: `drink/select-drink.html`,
        drinkCard: `drink/drink-card.html`
    }

    #root
    #drinks
    #drinkType

    constructor(drinks)
    {
        super()

        var mode = `open`
        this.#root = this.attachShadow({mode})

        this.#drinks = drinks
        this.#drinkType = DrinkType.COFFEE
    }

    selectDrink()
    {
        this.#root.innerHTML = TemplateService.get(this.constructor.UI.selectDrink)

        const drinkType = this.#root.getElementById(`drink-type`)
        const drinks = this.#root.getElementById(`drinks`)

        drinkType.innerHTML = this.#drinkType

        const drinkCard = TemplateService.get(this.constructor.UI.drinkCard)

        this.#drinks.forEach(drink => {

            const li = document.createElement(`LI`)

            li.innerHTML = TemplateService.get(this.constructor.UI.drinkCard)

            li.querySelector(`:scope .image`)?.dataset.src = drink.img.src
            li.querySelector(`:scope .name`)?.innerHTML = drink.name
            li.querySelector(`:scope .price`)?.innerHTML = drink.price
            li.querySelector(`:scope .badge`)?.innerHTML = drink.badge

            drinks.insertAdjacentElement(`beforeend`, li)
        });
    }
}