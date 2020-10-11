import { LocalStorage } from './LocalStorage'

export class OptionsStorage extends LocalStorage {
    constructor() {
        super('cm_Options', { showMonthEvents: true, showYearEvents: false, locale: '' })
        if (!this.locale) {
            this.locale = navigator.language || navigator.languages[0]
        }

    }
}