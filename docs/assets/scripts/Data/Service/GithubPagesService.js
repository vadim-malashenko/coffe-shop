import HttpService from "./HttpService.js"

class GithubPagesService extends HttpService
{
    #home
    #assets

    constructor(userName, appName)
    {
        this.#home = `https://`
            + userName
            + `.github.io/`
            + appName
        
        this.#assets = this.#home + `/docs/assets/`
    }

    get url()
    {
        return {
            home: this.#home,
            assets: this.#assets
        }
    }
}