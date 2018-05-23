import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField
import { Link } from 'react-router'
import defaultAvatar from 'public/default-avatar.png'
import './StudentList.scss'
import { Alert } from 'react-bootstrap'

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

  constructor (props) {
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

    return (
      <div className="container student-list">
        <div className="col-md-6 col-md-offset-3">
          <div className="search-student">
            <form onSubmit={this.searchStudent}>
              <div className="input-group">
                <input type="text" ref={(input) => { this.textInput = input }} className="form-control input-lg" placeholder="Procurar aluno" />
                <div className="input-group-btn">
                  <button className="btn btn-primary input-lg" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
                <div className="btn btn-warning btn-lg">
                  <Link to='/cadastro-aluno'>Cadastrar aluno</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-10 col-md-offset-1">
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false} >
              <TableRow>
                <TableHeaderColumn colSpan="5" style={{ textAlign: 'center' }}>
                  <h1>Alunos</h1>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Foto</TableHeaderColumn>
                <TableHeaderColumn>Nome</TableHeaderColumn>
                <TableHeaderColumn>Escola</TableHeaderColumn>
                <TableHeaderColumn>Turma</TableHeaderColumn>
                <TableHeaderColumn>Ações</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover={true}
              displayRowCheckbox={false}
              deselectOnClickaway={true}>
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
                    <Link onClick={() => { setSelectedStudent(student) }} to={'/aluno/' + student._id}>{student.name}</Link>
                  </TableRowColumn>
                  <TableRowColumn>{/* student.school || '' */}</TableRowColumn>
                  <TableRowColumn>{/* student.classNumber || '' */}</TableRowColumn>
                  <TableRowColumn>
                    <span className="edit-student">
                      <i className="fa fa-pencil-square-o fa-lg"
                        aria-hidden="true"></i> Editar
                    </span>
                    <span className="remove-student">
                      <i className="fa fa-user-times fa-lg"
                        ></i> Excluir
                    </span></TableRowColumn>
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
