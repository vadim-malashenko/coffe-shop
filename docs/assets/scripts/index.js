class Http
{
    async get(url)
    {
        const request = await fetch(url)

        const status = request.status
        const body = 200 === request.status
            ? await request.json()
            : request.statusText

        return {status, body}
    }
}

class Event extends EventTarget
{
    emit(type, detail)
    {
        this.dispatchEvent(Event.create(type, detail))
    }

    on(type, handler)
    {
        this.addEventListener(type, handler.bind(this))
    }

    off(type, handler)
    {
        this.removedEventListener(type, handler.bind(this))
    }

    static create(type, detail)
    {
        return new CustomEvent(type, {detail})
    }
}

class Menu extends Event
{
    #root

    constructor(selector, data)
    {
        super()

        this.#root = document.querySelector(selector)
        this.#root.insertAdjacentHTML(`beforeend`, this.render(data))
    }

    render(data)
    {
        const name = item => `<p>${item.name}</p>`
        const img = item => `<img src="/coffee-shop/docs/assets/images/${item.img.src}" alt="${item.img.alt}">`
        const li = item => `<li>${img(item)}${name(item)}</li>`

        return `<menu>${[...data].map(li).join(``)}</menu>`
    }
}

class Main extends Event
{
    #root

    constructor(selector, data)
    {
        super()

        this.#root = document.querySelector(selector)
        this.#root.insertAdjacentHTML(`beforeend`, this.render(data))
    }

    render(data)
    {
        const name = item => `<h1>${item.name}</h1>`
        const price = item => `<p><small>от </small><strong>${item.price}</strong></p>`
        const img = item => `<img src="/coffee-shop/docs/assets/images/${item.type}/${item.img.src}" alt="${item.img.alt}">`
        const article = item => `<article>${img(item)}${name(item)}${price(item)}</article>`

        return `<main>${[...data].map(article).join(``)}</main>`
    }
}

class App extends Http
{
    #menu

    constructor()
    {
        super()

        this.setMenu()
        this.setMamain(`coffee`)
    }

    async setMenu()
    {
        const menu = await this.get(`/coffee-shop/docs/assets/data/drinks.json`)

        this.#menu = new Menu(`body`, menu.body)
    }

    async setMain(type)
    {
        const main = await this.get(`/coffee-shop/docs/assets/data/drinks/${type}.json`)

        this.#menu = new Main(`body`, main.body)
    }

    static async load(ev)
    {
        window.App = new App()

        console.log(ev.target)
    }
}

window.addEventListener(`load`, App.load)