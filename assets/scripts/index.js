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

class Presenter extends Event
{
    #view

    constructor(view)
    {
        super()
        
        this.#view = view
    }

    view(data)
    {
        this.#view.render(data)
    }
}

class MenuPresenter extends Presenter
{
    constructor()
    {
        super(new MenuView())

        this.#view.on(`menu.click`, this.onMenuClick)
    }

    onMenuClick(ev)
    {
        console.log(ev.detail.type)
    }
}

class MainPresenter extends Presenter
{
    constructor()
    {
        super(new MainView())

        this.#view.on(`main.click`, this.onMainClick)
    }

    onMainClick(ev)
    {
        console.log(ev.detail.name)
    }
}

class Event extends EventTarget
{
    emit(type, detail)
    {
        this.dispatchEvent(new CustomEvent( type, {detail}))
    }

    on(type, handler)
    {
        this.addEventListener(type, handler)
    }

    off(type, handler)
    {
        this.addEventListener(type, handler)
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
            ev => this.emit(
                `menu.click`,
                {type: ev.target.closest(`li`).dataset.id}
            )
        )
    }

    template = items =>
        items.map(
            item => `
                <li data-id="${item.id}">
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

    #header
    #menu
    #main

    constructor()
    {
        this.#drinkService = new DrinkService()

        this.#menu = new MenuPresenter()
        this.#main = new MainPresenter()
    }

    async menu()
    {
        const response = await this.#drinkService.getDrinkTypes()

        if (200 === response.status)
        {
            this.#menu.view({items: response.body})
        }
        else
        {
            alert(`${response.status} ${response.body}`)
        }
    }

    async main(type)
    {
        const response = await this.#drinkService.getDrinksByType(type)

        if (200 === response.status)
        {
            this.#main.view({drinks: response.body})
        }
        else
        {
            alert(`${response.status} ${response.body}`)
        }
    }

    static async load(ev)
    {
        let shop

        ev.target.CoffeeShop = shop = new CoffeeShop()

        await shop.menu()
        await shop.main(`coffee`)
    }
}

window.addEventListener(`load`, CoffeeShop.load)