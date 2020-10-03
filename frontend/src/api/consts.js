export const monthNames = []
export const weekNames = []

const locale = navigator.languages ? navigator.languages[0] : navigator.language

const Capitalize = (text, resize = 0) => text.charAt(0).toUpperCase() + text.slice(1, resize <= 0 ? 1024 : resize)

const objDate = new Date()
objDate.setDate(1)

for (let m = 0; m < 12; m++) {
  objDate.setMonth(m)
  monthNames.push(Capitalize(objDate.toLocaleString(locale, { month: 'long' })))
}

objDate.setDate(1)
objDate.setMonth(3)
objDate.setFullYear(2020)

for (let d = 5; d <= 11; d++) {
  objDate.setDate(d)
  weekNames.push(Capitalize(objDate.toLocaleString(locale, { weekday: 'long' })))
}

export const monthNamesAbbr = monthNames.map(x => x.charAt(0).toUpperCase() + x.slice(1, 3))
export const weekNamesAbbr = weekNames.map(x => x.charAt(0).toUpperCase() + x.slice(1, 3))

console.log('Consts', { monthNames, weekNames, monthNamesAbbr, weekNamesAbbr })
