import HttpService from "./HttpService"

export default class DrinkService extends ApiService
{    
    constructor()
    {
        super([
            {
                path: 'drinks\/*',
                uri: `/drinks.json`
            },
            {
                path: 'drinks/([^\/]+)',
                uri: '/drinks/$1.json'
            }
        ])
    }
}