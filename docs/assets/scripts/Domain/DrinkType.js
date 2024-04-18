export default class DrinkType
{
    id
    name
    img

    constructor(id, name, img)
    {
        this.id = id
        this.name = name
        this.img = img
    }

    static fromObject(type)
    {
        return new DrinkType(type.id, type.name, type.img)
    }
}