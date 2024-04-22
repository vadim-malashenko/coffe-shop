import Storage from "./Storage.js"

export default class LocalStorage extends Storage
{
    constructor()
    {        
        super(localStorage)
    }
}