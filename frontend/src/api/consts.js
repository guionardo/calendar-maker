import { environment, buildDate } from '../../build_info'
import { log } from './log'

export const locale = navigator.languages ? navigator.languages[0] : navigator.language

export const buildDateLocale = new Date(buildDate).toLocaleString()

export const EventType = Object.freeze({
  FeriadoNacional: Symbol(1),
  FeriadoEstadual: Symbol(2),
  FeriadoMunicipal: Symbol(3),
  PontoFacultativo: Symbol(4),
  FeriadoNacionalAntecipado: Symbol(-1),
  FeriadoEstadualAntecipado: Symbol(-2),
  FeriadoMunicipalAntecipado: Symbol(-3),
  DiaConvencional: Symbol(9),
  EventoDoUsuario: Symbol(99)
})

log.debug('Consts', { environment, buildDate, EventType })
