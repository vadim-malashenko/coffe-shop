class Component extends Event
{
    #tagName
    #node

    constructor(parentNode, tagName = `div`, state = {})
    {
        this.#tagName = tagName
        this.#node = document.createElement(this.#tagName)
        
        for (key in state) this.#node.dataset[key] = state[key]

        parentNode.appendChild(this.#node)
    }

    render(data)
    {
        this.#node.innerHTML = this.template(data)
    }

    template(data)
    {
        return ``
    }

    get node()
    {
        return this.#node
    }
}