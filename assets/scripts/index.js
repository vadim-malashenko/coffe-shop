class HttpService
{
    static async get(url)
    {
        const request = await fetch(url)
        const response = await request.json()

        return response
    }
}

class DrinkService extends HttpService
{
    static async menu()
    {
        const menu = await DrinkService.get(`/menu`)

        return JSON.parse(menu)
    }
}

window.addEventListener(`load`, async ev => {
    const menu = await DrinkService.menu()
    console.log(menu)
})
