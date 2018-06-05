import React from 'react'
import { Link } from 'react-router'
import './FilterSearch.scss'
import StudentRegister from '../../routes/Student/StudentRegister'

export default class FilterSearch extends React.Component {
    static propTypes = {
        handleFilter: React.PropTypes.func
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="search-student">
                    <form onSubmit={this.props.handleFilter}>
                        <div className="input-group">
                            <input
                                type="text"
                                ref={(input) => { this.textInput = input }}
                                className="form-control input-lg"
                                placeholder="Procurar aluno" />
                        </div>
                        <div className="input-group-btn">
                            <button className="btn btn-primary input-lg" type="submit">
                                <i className="glyphicon glyphicon-search" />
                            </button>
                        </div>
                        <div className="input-group">
                            <div className="btn btn-warning btn-lg">
                                <Link to={StudentRegister.pathWithoutParam + '0/' + 'inserir'}>Cadastrar aluno</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
