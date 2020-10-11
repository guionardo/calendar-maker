export const holidays = function (year) {
    const feriados = []
    feriados.push({ day: new Date(year, 0, 1), name: "Ano novo" })
    feriados.push({ day: new Date(year, 3, 21), name: "Tiradentes" })
    feriados.push({ day: new Date(year, 4, 1), name: "Dia do Trabalho" })
    feriados.push({ day: new Date(year, 8, 7), name: "Dia da Independência" })
    feriados.push({ day: new Date(year, 9, 12), name: "Dia de Nossa Senhora Aparecida" })
    feriados.push({ day: new Date(year, 10, 15), name: "Proclamação da República" })
    feriados.push({ day: new Date(year, 11, 25), name: "Natal" })

    return feriados
}