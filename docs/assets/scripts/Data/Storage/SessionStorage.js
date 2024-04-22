import Storage from "./Storage.js"

export default class SessionStorage extends Storage
{
    constructor()
    {        
        super(sessionStorage)
    }
}