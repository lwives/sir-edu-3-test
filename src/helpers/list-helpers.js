import React from 'react'
import { Link } from 'react-router'
import { TableRowColumn } from 'material-ui/Table'

export const getFiltered = (registerForFilter, filterText) => {
    if (registerForFilter && registerForFilter.constructor === Array) {
        return registerForFilter.filter(register => {
            if (register.name) {
                const name = register.name.toLowerCase()
                const filter = filterText.toLowerCase()
                return name.includes(filter)
            }
        })
    }
}

let makeColumnKey = 0
export function makeColumn(column, elementContent, link) {
    var elemento
    makeColumnKey++
    if (column.content) {
        elemento = column.content(elementContent)
    }
    if (column.link) {
        elemento = <Link to={column.link(link)} className={column.className} onClick={column.onClick}>{elemento}</Link>
    }
    if (elemento) {
        elemento = <TableRowColumn key={column.name + makeColumnKey}>{elemento}</TableRowColumn>
    }
    return elemento
}
