//#region Data

class Storage
{
    #storage

    constructor(storage = null)
    {
        this.#storage = storage ?? {}
    }

    create(id, value)
    {
        this.#storage.setItem(id, value)
    }

    read(id)
    {
        this.#storage.getItem(id)
    }

    update(id, value)
    {
        this.create(id, value)
    }

    delete(id)
    {
        this.#storage.delete(id)
    }
}

class LocalStorage extends Storage
{
    constructor()
    {
        super(localStorage)
    }
}

class Repository
{
    #id
    #storage

    constructor(id, storage)
    {
        this.#id = id
        this.#storage = storage

        if (null === this.#storage.read(this.#id))
        {
            this.#storage.create(this.#id, {})
        }
    }

    getAll()
    {
        const all = this.#storage.read(this.#id)

        return `undefined` !== typeof all
            ? all
            : {}
    }

    get(id)
    {
        return this.getAll()[id] ?? null
    }

    find(fn)
    {
        const result = []
        const all = this.getAll()

        for (key in all)
        {
            if (fn(key, all[key]))
            {
                result.push(all[key])
            }
        }

        return result.length ? result : null
    }

    set(id, value)
    {
        const next = this.#storage.read(this.#id)
        next[id] = value

        this.#storage.update(this.#id, next)
    }

    unset(id)
    {
        const next = this.#storage.read(this.#id)
        delete next[id]

        this.#storage.update(this.#id, next)
    }
}

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
                response.body = JSON.parse(body) ?? null
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
    #types
    #drinks

    constructor()
    {
        super()

        this.#types  = new Repository(`types`, new LocalStorage())
        this.#drinks = new Repository(`drinks`, new LocalStorage())
    }

    async getDrinkTypes()
    {
        let types = this.#types.getAll()

        if (0 < Object.keys(types).length)
        {
            return types
        }

        types = await this.get(`/drinks`)

        if (0 < Object.keys(types).length)
        {
            for (id in types)
            {
                this.#types.set(id, types[id])
            }
        }

        return types
    }

    async getDrinks(types)
    {
        let drinks = this.#drinks.find(
            (id, drink) => types.includes(drink.type)
        )

        if (null === drinks)
        {
            const params = new URLSearchParams()

            params.append(`types`, types)

            drinks = await this.get(`/drinks?${params}`)

            for (id in drinks)
            {
                this.#drinks.set(id, drinks)
            }
        }

        return drinks
    }
}

//#endregion

//#region Domain



//#endregion

//#region Presentation

class Presenter
{
    #view

    constructor(view)
    {
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
    }
}

class View extends HTMLElement
{
    constructor(name)
    {
        super()

        this.tagName = name
    }
}

class MenuView extends View
{
    static li = item => `
        <li>
            <img src="${item.src}" title="${item.title}" alt="${item.alt}">
            <p>${item.name}</p>
        </li>
    `

    static menu = items => items.map(item => MenuView.li(item)).join(``)

    render(state)
    {
        this.innerHTML = this.template(state.items ?? [])
    }

    template(items)
    {
        return MenuView.menu(items)
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
    }

    async menu()
    {
        const items = await this.#drinkService.getDrinkTypes()
        
        this.#menu.view({items})
    }

    static async load(ev)
    {
        let shop

        ev.target.CoffeeShop = shop = new CoffeeShop()

        await shop.menu()
    }
}

window.addEventListener(`load`, CoffeeShop.load)