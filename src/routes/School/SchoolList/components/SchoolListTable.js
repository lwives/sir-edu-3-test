import React from 'react'
import { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } // TableFooter
  from 'material-ui/Table'
import { Avatar } from 'material-ui' // TextField
import { Link } from 'react-router'
import defaultAvatar from 'public/default-avatar.png'
import './List.scss'

import SchoolRegister from '../../SchoolRegister'
import ListLayout from '../../../../layouts/ListLayout'
import { getFiltered } from '../../../../helpers/list-helpers'

export default class SchoolListTable extends React.Component {
  static propTypes = {
    filterSchools: React.PropTypes.func.isRequired,
    getSchoolsList: React.PropTypes.func,
    schools: React.PropTypes.object,
    filterText: React.PropTypes.string,
    setSelectedSchool: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.searchSchool = this.searchSchool.bind(this)
    this.layoutData = {
      titulo: "Minhas Escolas",
      visibleColumn: [
        { name: 'Nome da Escola' },
        { name: 'Bairro' },
        { name: 'Cidade' },
        { name: 'Alunos Cadastrados' }
      ]
    }
    this.register = {
      handleFilter: this.searchSchool,
      descriptionRegister: "escola",
      pathRegister: SchoolRegister.pathWithoutParam,
      lenght: this.props.schools.list.length,
      textNothingFound: "Nenhuma Escola cadastrada."
    }
  }

  searchSchool(e) {
    e.preventDefault()
    const { filterSchools } = this.props
    filterSchools(this.textInput.value)
  }

  componentDidMount() {
    const { getSchoolsList } = this.props

    if (!this.register.lenght) {
      getSchoolsList()
    }
  }

  render() {
    const { schools, filterText, setSelectedSchool } = this.props
    const filteredSchools = getFiltered(schools.list, filterText || '')
    return (
      <ListLayout className="container school-list" layout={this.layoutData} register={this.register}>
        <TableBody
                            showRowHover
                            displayRowCheckbox={false}
                            deselectOnClickaway>
          {/* <Table selectable={false}>
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
          { filteredSchools.map((school, index) => (
            <TableRow key={index}>
              <TableRowColumn>
                {
                  school.avatar
                    ? <Avatar src={school.avatar.path} className="school-avatar pull-left" size={45} />
                    : <Avatar src={defaultAvatar} className="school-avatar pull-left" size={45} />
                }
              </TableRowColumn>
              <TableRowColumn>
                <Link onClick={() => { setSelectedSchool(school) }}
                  to={SchoolRegister.pathWithoutParam + school._id}>{school.name}</Link>
              </TableRowColumn>
              <TableRowColumn>{school.school || ''}</TableRowColumn>
              <TableRowColumn>{/* school.classNumber || '' */}</TableRowColumn>
              <TableRowColumn>
                <Link to={SchoolRegister.pathWithoutParam + school._id + '/editar'} className="edit-school">
                  <i className="fa fa-pencil-square-o fa-lg"
                    aria-hidden="true" /> Editar
                    </Link>
                <Link to={SchoolRegister.pathWithoutParam + school._id + '/excluir'} className="remove-school">
                  <i className="fa fa-user-times fa-lg" /> Excluir
                    </Link></TableRowColumn>
            </TableRow>
          )) }
        </TableBody>
      </ListLayout>
    )
  }
}
