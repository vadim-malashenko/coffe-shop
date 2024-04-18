export default class Router
{
    #routes = []
    #current = null
    #next = null
    #handled = false
    #listen = false

    constructor(routes = [])
    {
        this.addRoutes(routes)
    }

    addRoutes(routes)
    {
        Array.isArray(routes) && routes.forEach
       (
            route => route.length == 2
                && route[0].constructor.name == 'RegExp'
                && typeof route[1] == 'function'
                && this.#routes.push(route)
        )
    }

    listen()
    {
        this.#listen && this.stop()
        this.start()

        return this
    }

    check(ev)
    {
        this.#next = Router.hash()

        if(this.#next !== null && this.#current !== this.#next)
        {
            this.#handled = false

            this.#routes.forEach
            (
                route =>
                    ! this.#handled
                    && route[0].test(this.#next)
                    &&(
                        this.#handled = true,
                        this.#current = this.#next,
                        route[1](this.#current)
                    )
            )
        }
    }

    start()
    {
        addEventListener('popstate', this.check.bind(this))
        this.#listen = true
    }

    stop()
    {
        removeEventListener('popstate', this.check.bind(this))
        this.#listen = false
    }

    static hash()
    {
        const matches = location.href.match(/#(.*)$/)

        return matches !== null
            ? matches [1].replace(/^\/|\/$/, '')
            : null
    }

    static navigate(hash)
    {
        location.href = (`${location.href.replace(/#(.*)$/, '')}#${hash}`)
    }
}