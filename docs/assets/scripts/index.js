class App
{
    static async load(ev)
    {
        const request = await fetch(`/coffee-shop/docs/assets/data/drinks.json`)
        const response = await request.json()
        
        const menu = response

        console.log(menu)
    }
}

window.addEventListener(`load`, App.load)