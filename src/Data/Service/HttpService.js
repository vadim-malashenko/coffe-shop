export class HttpService
{
    static async get(url)
    {
        const request = await fetch(url)
        const response = await request.json()
        
        return response
    }
}