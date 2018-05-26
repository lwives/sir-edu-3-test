import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField
import { Link } from 'react-router'

import utilFunctions from '../../../../constants/utilFunctions'
import defaultAvatar from 'public/default-avatar.png'
import './StudentList.scss'
import { Alert } from 'react-bootstrap'
import StudentRegister from '../../StudentRegister';
import StudentMenu from '../../StudentMenu';

const getFilteredStudents = (students, filterText) => {
  return students.filter(student => {
    if (student.name) {
      const name = student.name.toLowerCase()
      const filter = filterText.toLowerCase()
      return name.includes(filter)
    }
  })
}

export default class StudentListTable extends React.Component {
  static propTypes = {
    filterStudents: React.PropTypes.func.isRequired,
    getStudentsList: React.PropTypes.func,
    students: React.PropTypes.object,
    filterText: React.PropTypes.string,
    setSelectedStudent: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.searchStudent = this.searchStudent.bind(this)
  }

  searchStudent(e) {
    e.preventDefault()
    const { filterStudents } = this.props
    filterStudents(this.textInput.value)
  }

  componentDidMount() {
    const { getStudentsList, students } = this.props

    if (!students.list.length) {
      getStudentsList()
    }
  }

  render() {
    const { students, filterText, setSelectedStudent } = this.props
    const filteredStudents = getFilteredStudents(students.list, filterText || '')
    const visibleColumn = [ {name: 'Foto'}, 
                            {name: 'Nome'}, 
                            {name: 'Escola'}, 
                            {name: 'Turma'}, 
                            {name: 'Ações'} ]

    return (
      <div className="container student-list">
        <div className="col-md-6 col-md-offset-3">
          <div className="search-student">
            <form onSubmit={this.searchStudent}>
              <div className="input-group">
                <input
                  type="text"
                  ref={(input) => { this.textInput = input }}
                  className="form-control input-lg"
                  placeholder="Procurar aluno" />
                <div className="input-group-btn">
                  <button className="btn btn-primary input-lg" type="submit">
                    <i className="glyphicon glyphicon-search" />
                  </button>
                </div>
                <div className="btn btn-warning btn-lg">
                  <Link to={utilFunctions.urlWithoutParam(StudentRegister.path)}>Cadastrar aluno</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-10 col-md-offset-1">
          <div className="container">
            <h1>Alunos</h1>
          </div>
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false} >
              <TableRow>
                {
                  visibleColumn.map((column = {name:''}, index) => {
                    return <TableHeaderColumn>{column.name}</TableHeaderColumn>
                  })
                }
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
              displayRowCheckbox={false}
              deselectOnClickaway>
              {filteredStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableRowColumn>
                    {
                      student.avatar
                        ? <Avatar src={student.avatar.path} className="student-avatar pull-left" size={45} />
                        : <Avatar src={defaultAvatar} className="student-avatar pull-left" size={45} />
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link
                      onClick={() => { setSelectedStudent(student) }}
                      to={StudentMenu.pathWithoutParam + student._id}>{student.name}</Link>
                  </TableRowColumn>
                  <TableRowColumn>{ student.school || '' }</TableRowColumn>
                  <TableRowColumn>{/* student.classNumber || '' */}</TableRowColumn>
                  <TableRowColumn>
                    <Link to={StudentRegister.pathWithoutParam + student._id + '/editar'} className="edit-student">
                      <i className="fa fa-pencil-square-o fa-lg"
                        aria-hidden="true" /> Editar
                    </Link>
                    <Link to={StudentRegister.pathWithoutParam + student._id + '/excluir'} className="remove-student">
                      <i className="fa fa-user-times fa-lg" /> Excluir
                    </Link></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {
            !students.list.length &&
            <Alert bsStyle="warning">
              <strong>Aviso:</strong> Nenhum aluno cadastrado.
          </Alert>
          }
        </div>
      </div>)
  }
}
