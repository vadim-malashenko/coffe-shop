import Repository from "../Repository.js"
import SessionStorage from "../Storage/SessionStorage.js"

export default class DrinkTypeRepository extends Repository
{
    constructor()
    {
        super(`drinks`, new SessionStorage())
    }
}