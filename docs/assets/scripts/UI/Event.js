export default class Event extends EventTarget
{
    emit(type, detail)
    {
        this.dispatchEvent(Event.create(type, detail))
    }

    on(type, handler)
    {
        this.addEventListener(type, handler)
    }

    off(type, handler)
    {
        this.removedEventListener(type, handler)
    }

    static create(type, detail)
    {
        return new CustomEvent(type, {detail})
    }
}