import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'

import FilterSearch from '../../components/FilterSearch'
import HeaderDefault from '../../components/HeaderDefault'
import './ListLayout.scss'
import '../../styles/core.scss'
import AlertNothingFound from '../../components/AlertNothingFound'

export const ListLayout = ({ children, layout, register, className }) => {
    const { handleFilter, descriptionRegister = 'aluno', pathRegister = '/aluno/', lenght, textNothingFound } = register
    const { visibleColumn, titulo } = layout
    
    return (
        <div className={'row container-list ' + className}>
            <div className="col-md-12 ">
                <div className="col-md-12">
                    Página Inicial / Alunos
                </div>
                <div className="col-md-12">
                    <HeaderDefault texto={titulo} type="h1" />
                </div>
                
                <FilterSearch descriptionRegister={descriptionRegister} pathRegister={pathRegister} handleFilter={handleFilter} />

                <div className="col-md-12">
                    <Table selectable={false}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false} >
                            <TableRow>
                                {
                                    visibleColumn.map((column = { name: '' }, index) => {
                                        return <TableHeaderColumn key={index}>{column.name}</TableHeaderColumn>
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        
                        { children }

                    </Table>
                    <div>
                    {
                    lenght <= 0 && 
                        <AlertNothingFound textNothingFound={textNothingFound} />
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

ListLayout.propTypes = {
    layout: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired,
    register: React.PropTypes.object.isRequired
}

export default ListLayout
