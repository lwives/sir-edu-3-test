import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField
import { Link } from 'react-router'
import defaultAvatar from 'public/default-avatar.png'
import './List.scss'
import { Alert } from 'react-bootstrap'

import SchoolRegister from '../../SchoolRegister'
//import StudentMenu from '../../StudentMenu'
import ListLayout from '../../../../layouts/ListLayout';

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
    this.visibleColumn = [
      { name: 'Foto' },
      { name: 'Nome' },
      { name: 'Escola' },
      { name: 'Turma' },
      { name: 'Ações' }]
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
      <ListLayout className="container student-list" titulo="Meus Alunos" handleFilter={this.searchStudent}>
        <div>
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false} >
              <TableRow>
                {
                  this.visibleColumn.map((column = { name: '' }, index) => {
                    return <TableHeaderColumn key={index}>{column.name}</TableHeaderColumn>
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
                    <Link onClick={() => { setSelectedStudent(student) }}
                      to={SchoolRegister.pathWithoutParam + student._id}>{student.name}</Link>
                  </TableRowColumn>
                  <TableRowColumn>{student.school || ''}</TableRowColumn>
                  <TableRowColumn>{/* student.classNumber || '' */}</TableRowColumn>
                  <TableRowColumn>
                    <Link to={SchoolRegister.pathWithoutParam + student._id + '/editar'} className="edit-student">
                      <i className="fa fa-pencil-square-o fa-lg"
                        aria-hidden="true" /> Editar
                    </Link>
                    <Link to={SchoolRegister.pathWithoutParam + student._id + '/excluir'} className="remove-student">
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
      </ListLayout>
    )
  }
}
