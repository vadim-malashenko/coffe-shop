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
        this.#root = document.querySelector(selector)
        this.#root.insertAjacentHTML(`beforeend`, this.render(data))
    }

    render(data)
    {
        return `<menu>`
            + data.map(item => `<li><img src="/coffee-shop/docs/assets/images/${item.src}"></li>`)
        `</menu>`
    }
}

class App extends Http
{
    #menu

    constructor()
    {
        this.setMenu()
    }

    async setMenu()
    {
        const menu = await get(`/coffee-shop/docs/assets/data/drinks.json`)
        this.#menu = new Menu(`body`, menu)
    }

    static async load(ev)
    {
        window.App = new App()
        
        console.log(ev.target)
    }
}

window.addEventListener(`load`, App.load)