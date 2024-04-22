import GithubPagesService from "./GithubPagesService.js"

export default class ApiService extends GithubPagesService
{
    #resources
    
    constructor(resources)
    {
        super(`vadim-malashenko`, `coffee-shop`)

        this.#resources = resources
    }

    async get(name)
    {
        const url = this.getUrl(name) ?? null

        if (null === url)
        {
            return {status: 404, body: `Not found: ${name}`}
        }

        const response = await super.get(url)

        if (200 === response.status)
        {
            response.body = await response.body.json()
        }
        
        return response
    }

    getUrl(path)
    {
        const uri = this
            .#resources
            .filter(
                resource => path.match(
                    new RegExp(resource.path)
                )
            )
            .map(
                resource => resource.uri.replace(
                    new RegExp(resource.path),
                    resource.uri
                )
            )
            [0]
            ?? null

        return null !== uri
            ? this.url.assets + uri
            : null
    }
}