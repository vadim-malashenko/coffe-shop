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
    #element

    constructor(selector, data)
    {
        super()

        this.#root = document.querySelector(selector)
        this.#root.insertAdjacentHTML(`beforeend`, this.render(data))

        this.#element = this.#root.querySelector(`:scope menu`)
        
        this.#element.addEventListener(`click`, this.onClick.bind(this))
    }

    async onClick(ev)
    {
        const li = `li` === ev.target.tagName
            ? ev.target
            : ev.target.closest(`li`)
        
        li.parentNode.dataset.type = li.dataset.id
        
        this.emit(`menu.click`, {type: li.dataset.id})
    }

    render(data)
    {
        const name = item => `<p>${item.name}</p>`
        const img = item => `<img src="/coffee-shop/docs/assets/images/${item.img.src}" alt="${item.img.alt}">`
        const li = item => `<li data-id="${item.id}">${img(item)}${name(item)}</li>`

        return `<menu data-type="${data[0].id}">${[...data].map(li).join(``)}</menu>`
    }

    getType()
    {
        return this.#element.dataset.type
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

    update(data)
    {
        const main = this.#root.querySelector(`:scope main`)
        this.#root.remove(main)
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
    #main

    constructor()
    {
        super()

        this.setMenu()
        this.setMain(this.#menu.getType())

        this.#menu.on(`menu.click`, this.onMenuClick.bind(this))
    }

    async onMenuClick(ev)
    {
        console.log(ev.detail)

        const main = await this.get(`/coffee-shop/docs/assets/data/drinks/${ev.detail.type}.json`)

        this.#main.update(main)
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