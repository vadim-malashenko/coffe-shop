export default class HttpService
{
    async get(url)
    {
        const request = await fetch(url)

        const status = request.status
        
        const body = 200 === request.status
            ? request
            : request.statusText
        
        return {status, body}
    }
}