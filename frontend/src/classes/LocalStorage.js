export class LocalStorage {
    constructor(name, fields, autoLoad = false) {
        this.name = name
        if (fields.length == 0) {
            throw "Missing field definition"
        }
        this._fields = Object.getOwnPropertyNames(fields)
        this._fields.forEach(element => {
            this[element] = fields[element]
        });
        if (autoLoad) {
            this.load()
        }
    }

    load() {
        const stored = localStorage.getItem(this.name)
        if (stored) {
            try {
                let parsed = JSON.parse(stored)
                this._fields.forEach(element => {
                    this[element] = parsed[element] || this[element]
                })
                return true
            } catch (error) {
                console.error('Invalid stored value for "' + this.name + '"', error)
            }
        }
        return false
    }

    save() {
        const dict = {}
        this._fields.forEach(element => {
            dict[element] = this[element]
        })
        try {
            localStorage.setItem(this.name, JSON.stringify(dict))
            return true
        }
        catch (error) {
            console.error('Data not stored for "' + this.name + '"', error)
        }
        return false
    }
}

export class SubStorage extends LocalStorage {
    constructor() {
        super("sub", { id: 0, value: 10 })
    }
}

