
class SelectDrink extends HTMLElement
{
    static get observedAttributes()
    {
        return [`drink-type`]
    }
    
    constructor()
    {
        super()

        var mode = `open`
        var shadowRoot = this.attachShadow({mode})

        shadowRoot.innerHTML = this.getAttribute(`drink-type`) || ``;
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (name === `my-attribute`)
        {
            this.shadowRoot.querySelector(`div`).textContent = newValue
        }
    }
}

export default SelectDrinkы