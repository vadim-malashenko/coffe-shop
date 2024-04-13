//#region Data

class HttpService
{
    async get(url)
    {
        const request = await fetch(url)
        const response = {status: 200, body: null}

        switch (request.status)
        {
            case 200:
                const body = await request.json()
                response.body = body ?? null
            break

            default:
                request.status = request.status
                response.body = request.statusText
        }
            
        return response
    }
}

class DrinkService extends HttpService
{
    constructor()
    {
        super()
    }

    async getDrinkTypes()
    {
        return await this.get(`/drinks/`)
    }

    async getDrinksByType(type)
    {
        return await this.get(`/drinks/${type}/`)
    }
}

//#endregion

//#region Domain



//#endregion

//#region Presentation

class Event extends EventTarget
{
    emit(type, detail)
    {
        this.dispatchEvent(new CustomEvent( type, {detail}))
    }

    on(type, handler)
    {
        this.addEventListener(type, handler.bind(this))
    }

    off(type, handler)
    {
        this.addEventListener(type, handler.bind(this))
    }
}

class Presenter extends Event
{
    #views

    constructor(views)
    {
        super()
        
        this.#views = views
    }

    view(id)
    {
        return this.#views[id] ?? null
    }
}

class ShopPresenter extends Presenter
{
    constructor()
    {
        super({
            menu: new MenuView(),
            main: new MainView()
        })

        this.view(`menu`).on(`menu.click`, this.onMenuClick)
        this.view(`main`).on(`main.click`, this.onMainClick)
    }

    select(index)
    {
        this.view(`menu`)
            .querySelector(`:scope li:nth-child(${index})`)
            .click()
    }

    async onMenuClick(ev)
    {
        this.emit(`shop.menu`, ev.detail.type)
    }

    async onMainClick(ev)
    {
        this.emit(`shop.main`, ev.detail.drink)
    }

    async menu(items)
    {
        this.view(`menu`).render({items})
    }

    async main(drinks)
    {
        this.view(`main`).render({drinks})
    }
}

class View extends Event
{
    constructor()
    {
        super()
    }
}

class MenuView extends View
{
    #element

    constructor(container = document.body)
    {
        super()
        
        this.#element = document.createElement(`menu`)
        container.appendChild(this.#element)

        this.#element.addEventListener(
            `click`,
            ev =>
            {
                this.#element
                    .querySelector(`:scope li[data-active="true"]`)
                    .dataset.active = false

                const li = ev.target.closest(`li`)
                li.dataset.active = true

                this.emit(`menu.click`, {type: li.dataset.id})
            }
        )
    }

    template = items =>
        items.map(
            (item, index) => `
                <li data-id="${item.id}" data-active="${index === 0}">
                    <img src="${item.src}" title="${item.title}" alt="${item.alt}">
                    <p>${item.name}</p>
                </li>
            `
        )

    render(state)
    {
        this.#element.innerHTML = this.template(state.items ?? []).join(``)
    }
}

class MainView extends View
{
    #element

    constructor(container = document.body)
    {
        super()
        
        this.#element = document.createElement(`main`)
        container.appendChild(this.#element)

        this.#element.addEventListener(
            `click`,
            ev => this.emit(
                `main.click`,
                {name: ev.target.closest(`article`).dataset.id}
            )
        )
    }

    template = drinks =>
        drinks.map(
            drink => `
                <article data-id=${drink.id}>
                    <div>
                        <img src="${drink.src}" alt="${drink.alt}">
                        <h1>${drink.name}</h1>
                        <p><small>от </small><strong>${drink.price}₽</strong></p>
                    </div>
                </article>
            `
        )

    render(state)
    {
        this.#element.innerHTML = this.template(state.drinks ?? []).join(``)
    }
}

//#endregion


class CoffeeShop
{
    #drinkService

    #shop

    constructor()
    {
        this.#drinkService = new DrinkService()

        this.#shop = new ShopPresenter()

        this.#shop.on(`shop.menu`, this.main)
    }

    async menu(ev)
    {
        const response = await this.#drinkService.getDrinkTypes()

        if (200 === response.status)
        {
            this.#shop.menu(response.body)
            this.#shop.select(0)
        }
        else
        {
            alert(`${response.status} ${response.body}`)
        }
    }

    async main(ev)
    {
        const response = await this.#drinkService.getDrinksByType(ev.detail.type)

        if (200 === response.status)
        {
            this.#shop.main(response.body)
        }
        else
        {
            alert(`${response.status} ${response.body}`)
        }
    }

    static async load(ev)
    {
        const app = new CoffeeShop()

        ev.target.CoffeeShop = app

        await app.menu(ev)
    }
}

window.addEventListener(`load`, CoffeeShop.load)