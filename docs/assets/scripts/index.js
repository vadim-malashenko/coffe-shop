class App
{
    static async load(ev)
    {
        const request = await fetch(`/menu.json`)
        const response = await request.json()
        const menu = JSON.parse(response)

        console.log(menu)
    }
}

window.addEventListener(`load`, App.load)