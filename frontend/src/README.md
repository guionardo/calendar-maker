# Calendar Maker Frontend

## Data Schema

holiday

``` json
{
    "day": Date(),
    "name": "string",
    "type": Const.HolidayType
}
```

Const.HolidayType

1. Feriado Nacional
2. Feriado Estadual
3. Feriado Municipal
4. Ponto Facultativo
9. Dia convencional
99. Evento do usuário

-?. Feriado antecipado
