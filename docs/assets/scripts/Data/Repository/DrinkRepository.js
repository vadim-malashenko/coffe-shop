import Repository from "../Repository.js"
import DrinkService from "../Service/DrinkService.js"
import SessionStorage from "../Storage/SessionStorage.js"

export default class DrinkRepository extends Repository
{
    constructor()
    {
        super(`drinks`, new SessionStorage(), new DrinkService())
    }

    getByType(type)
    {
        return this.find(`type`, type)
    }
}