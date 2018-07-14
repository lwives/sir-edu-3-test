import React from 'react'
import { Link } from 'react-router'
import './FilterSearch.scss'

export default class FilterSearch extends React.Component {
    static propTypes = {
        handleFilter: React.PropTypes.func
    }

    render() {
        const { descriptionRegister, pathRegister } = this.props
        return (
            <div className="col-md-12">
                <div className="search-student">
                    <form onSubmit={this.props.handleFilter} className="row">
                        <div className="input-group col">
                            <input
                                type="text"
                                ref={(input) => { this.textInput = input }}
                                className="form-control input-lg"
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
