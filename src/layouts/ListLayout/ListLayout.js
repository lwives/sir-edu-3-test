import React from 'react'
import FilterSearch from '../../components/FilterSearch'
import HeaderDefault from '../../components/HeaderDefault'
import './ListLayout.scss'
import '../../styles/core.scss'

export const ListLayout = ({ children, titulo, handleFilter }) => {
    return (
        <div className="container student-list">
            <div className="col-md-10 col-md-offset-1">
                <FilterSearch handleFilter={handleFilter} />
                <div className="col-md-12">
                    <HeaderDefault texto={titulo} type="h1" />
                </div>
                <div className="col-md-12">
                    {children}
                </div>
            </div>
        </div>
    )
}

ListLayout.propTypes = {
    titulo: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
}

export default ListLayout
