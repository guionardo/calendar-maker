import { environment, buildDate } from '../../build_info'

export const log = function (env) {
    const info = (msg, data) => {
        console.log(msg, data)
    }
    const error = (msg, data) => {
        console.error(msg, data)
    }
    const debug = env.toUpperCase() == 'PRODUCTION' ?
        () => { } :
        (msg, data) => {
            console.debug('🐞 ' + msg, data)
        }

    const warning = (msg, data) => {
        console.warn('⚠️ ' + msg, data)
    }

    return {
        info, error, debug, warning
    }
}(environment)

log.info('📅 Calendar Maker Build', buildDate)
log.debug('Testing debug', true)
log.warning('Testing warning', false)