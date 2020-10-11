import { log } from './log'
export const storage = function () {
    const emptyOptions = {
        monthEvents: true,
        yearEvents: true
    }
    const getOptions = function () {
        let options = localStorage.getItem('cm_options') || '{}'

        try {
            options = JSON.parse(options)
            log.debug('STORAGE:getOptions', options)
        } catch (err) {
            options = emptyOptions
            log.error('STORAGE:getOptions', err)
        }

        return options
    }

    const setOption = function (key, value) {
        let options = getOptions()
        options[key] = value
        localStorage.setItem('cm_options', JSON.stringify(options))
        log.debug(`STORAGE:setOption(${key} , ${value})`, options)
    }

    return { getOptions, setOption }
}()