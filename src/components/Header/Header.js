import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './Header.scss'
import logo from './assets/sir-edu_logo.png'
import { connect } from 'react-redux'
import { logout } from 'store/login'

import Home from '../../routes/Home'
import UserRegister from '../../routes/User/UserRegister'
import Login from '../../routes/Login'
import Paginas from '../../pages'
import StundentList from '../../routes/Student/StudentList/'
import SchoolList from '../../routes/School/SchoolList'
import GroupList from '../../routes/Group/GroupList'

export const Header = (props, user) => (
  <header>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to={Home.pathWithoutParam}><img id="header-logo" src={logo} /></Link>
          </div>
        </div>
        <div className="navbar-inner">
          <ul className="nav navbar-nav">
            <li key="inicial"><Link to={Home.pathWithoutPath}>Página inicial</Link></li>
            {
              (!props.auth.isAuthenticated)
                ? [
                  <li key="quem-somos"><Link to={Paginas.quemSomos.pathWithoutParam}>Quem somos</Link></li>,
                  <li key="servicos"><Link to={Paginas.servico.pathWithoutParam}>Serviços</Link></li>,
                  <li key="contato"><Link to={Paginas.contato.pathWithoutParam}>Contato</Link></li>
                ] : [
                  <li key="alunos"><Link to={StundentList.pathWithoutParam}>Alunos</Link></li>,
                  <li key="escolas"><Link to={SchoolList.pathWithoutParam}>Escolas</Link></li>
                  // <li key="grupos"><Link to={GroupList.pathWithoutParam}>Grupos</Link></li>
                ]
            }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {
              (!props.auth.isAuthenticated)
                ? [
                  <li key="login"><Link to={Login.pathWithoutParam}><span className="glyphicon glyphicon-log-in" /> Entrar</Link></li>
                ] : [
                  <li key="usuario"><Link to={UserRegister.pathWithoutParam + '/' + props.auth.user._id + '/editar'}><span className="glyphicon glyphicon-user" /> Bem-vindo, {props.auth.user.name}</Link></li>,
                  <li key="logout"><a onClick={() => { props.logout(); }}>
                    <span className="glyphicon glyphicon-log-out" /> Sair
                  </a></li>
                ]
            }
          </ul>
        </div>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  logout
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
