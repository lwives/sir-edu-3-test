import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField

import defaultAvatar from 'public/default-avatar.png'
import './List.scss'
import { Alert } from 'react-bootstrap'
import StudentRegister from '../../StudentRegister'
import StudentMenu from '../../StudentMenu'
import ListLayout from '../../../../layouts/ListLayout'
import { getFiltered, makeColumn } from '../../../../helpers/list-helpers'

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
    this.inputValue = {}

    this.layoutData = {
      titulo: 'Meus Alunos',
      visibleColumn: this.visibleColumn
    }
    this.register = {
      handleFilter: this.searchStudent,
      searchValue: this.searchValue,
      descriptionRegister: 'aluno',
      pathRegister: StudentRegister.pathWithoutParam,
      lenght: this.props.students.list.length,
      textNothingFound: 'Nenhum Aluno cadastrado!'
    }
  }

  searchStudent(e) {
    e.preventDefault()
    const { filterStudents } = this.props
    filterStudents(this.inputValue)
  }

  searchValue(value) {
    this.inputValue = value
  }

  componentDidMount() {
    const { getStudentsList } = this.props

    if (!this.register.length) {
      getStudentsList()
    }
  }

  render() {
    const { students, filterText, setSelectedStudent } = this.props
    let filteredRegister
    filteredRegister = getFiltered(students.list, filterText || '')

    return (
      <ListLayout className="list" layout={this.layoutData} register={this.register}>
         <TableBody
                            showRowHover
                            displayRowCheckbox={false}
                            deselectOnClickaway>
        {/*  <Table selectable={false}>
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
              deselectOnClickaway> */}
              {
                filteredRegister && filteredRegister.map((student, index) => (
                  <TableRow key={index}>
                    {this.visibleColumn.map((column, index) => {
                      let elementContent, link

                      switch (column.name) {
                        case 'Foto':
                          elementContent = (student.avatar) ? student.avatar.path : defaultAvatar
                          break
                        case 'Nome':
                          elementContent = student.name
                          link = StudentMenu.pathWithoutParam + student._id
                          column.onClick = setSelectedStudent
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

                      return makeColumn(column, elementContent, link)
                    })
                    }
                  </TableRow>
                ))}
            {/* </TableBody>
          </Table>
          {
            !filteredRegister &&
            <Alert bsStyle="warning">
              <strong>Aviso:</strong> Nenhum aluno selecionado.
            </Alert>
          }*/}
        </TableBody>
      </ListLayout>
    )
  }
}
