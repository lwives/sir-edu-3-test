import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField
import { Link } from 'react-router'

import defaultAvatar from 'public/default-avatar.png'
import './List.scss'
import { Alert } from 'react-bootstrap'
import StudentRegister from '../../StudentRegister'
import StudentMenu from '../../StudentMenu'
import ListLayout from '../../../../layouts/ListLayout';

const getFiltered = (registerForFilter, filterText) => {
  return registerForFilter.filter(register => {
    if (register.name) {
      const name = register.name.toLowerCase()
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

    //const avatar = student.avatar ? student.avatar.path : defaultAvatar
    let returnParameter = (param) => { return param || '' }

    this.visibleColumn = [
      {
        name: 'Foto',
        content: (avatar) => { return <Avatar src={avatar} className="student-avatar pull-left" size={45} /> }
      },
      {
        name: 'Nome',
        content: returnParameter,
        link: returnParameter
      },
      {
        name: 'Escola',
        content: returnParameter
      },
      {
        name: 'Turma',
        content: returnParameter
      },
      {
        name: 'Editar',
        className: 'register-edit',
        content: () => { return <span><i className="fa fa-pencil-square-o fa-lg" /> Editar</span> },
        link: (_id) => { return StudentRegister.pathWithoutParam + _id + '/editar' } 
      },
      {
        name: 'Excluir',
        className: 'register-remove',
        content: () => { return <span><i className="fa fa-user-times fa-lg" /> Excluir</span> },
        link: (_id) => { return StudentRegister.pathWithoutParam + _id + '/excluir' } 
      }
    ]
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
    const filteredRegister = getFiltered(students.list, filterText || '')

    return (
      <ListLayout className="container list" titulo="Meus Alunos" handleFilter={this.searchStudent}>
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
              {filteredRegister.map((student, index) => (
                //student.avatar 
                <TableRow key={index}>
                  {this.visibleColumn.map((column, index) => {
                    let elementContent, link 
                    let elemento = null

                    switch (column.name) {
                      case 'Foto':
                        elementContent = (student.avatar) ? student.avatar.path : defaultAvatar
                        // elemento = (
                        //   student.avatar
                        //     ? <Avatar src={student.avatar.path} className="student-avatar pull-left" size={45} />
                        //     : <Avatar src={defaultAvatar} className="student-avatar pull-left" size={45} />

                        // )
                        break
                      case 'Nome':
                        elementContent = student.name
                        link = StudentMenu.pathWithoutParam + student._id
                        break
                      case 'Escola':
                        elementContent = student.school
                        break
                      case 'Turma':
                        elementContent = student.classNumber
                        break
                      case 'Editar':
                        link = student._id
                        break
                      case 'Excluir':
                        link = student._id
                        break
                      default:
                        break
                    }
                    if (column.content) {
                      elemento = column.content(elementContent)
                    }
                    if (column.link) {
                      elemento = <Link to={column.link(link)} className={column.className} onClick={column.onClick}>{elemento}</Link>
                    }
                    if (elemento) {
                      elemento = <TableRowColumn>{elemento}</TableRowColumn>
                    }
                    return elemento
                  })
                  }

                  {/* <TableRowColumn>
                    <Link
                      onClick={() => { setSelectedStudent(student) }}
                      to={StudentMenu.pathWithoutParam + student._id}>{student.name}</Link>
                  </TableRowColumn> */}
                  {/* <TableRowColumn>{student.school || ''}</TableRowColumn> */}
                  {/* <TableRowColumn>student.classNumber || ''</TableRowColumn> */}
                  {/* <TableRowColumn>
                    <Link to={StudentRegister.pathWithoutParam + student._id + '/editar'} className="resgister-edit">
                      visibleColumn
                    </Link>
                    <Link to={StudentRegister.pathWithoutParam + student._id + '/excluir'} className="register-remove">
                      <i className="fa fa-user-times fa-lg" /> Excluir
                    </Link></TableRowColumn> */}
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
