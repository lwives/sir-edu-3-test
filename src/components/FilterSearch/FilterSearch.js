import React from 'react'
import { Link } from 'react-router'
import './FilterSearch.scss'

export default class FilterSearch extends React.Component {
    static propTypes = {
        handleFilter: React.PropTypes.func,
        descriptionRegister: React.PropTypes.string,
        pathRegister: React.PropTypes.string, 
        searchValue: React.PropTypes.func
    }

    render() {
        const { descriptionRegister, pathRegister, searchValue } = this.props
        
        return (
            <div className="col-md-12">
                <div className="search-student">
                    <form onSubmit={this.props.handleFilter} className="row">
                        <div className="input-group col">
                            <input
                                type="text"
                                //ref={(input) => { searchValue(input.value) }}
                                className="form-control input-lg"
                                //name="textInput"
                                //wevalue={inputValue}
                                placeholder={'Procurar ' + descriptionRegister} />
                        </div>
                        <div className="input-group-btn col-1">
                            <button className="btn btn-primary input-lg" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                        <div className="input-group-btn col-2">
                            <button className="btn btn-secondary">
                                <Link to={pathRegister + '0/' + 'inserir'}>Cadastrar {descriptionRegister}</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
