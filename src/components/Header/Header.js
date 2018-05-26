import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import './Header.scss'
import logo from './assets/sir-edu_logo.png'
import { connect } from 'react-redux'
import { logout } from 'store/login'

export const Header = (props) => (
  <header>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to="/"><img id="header-logo" src={logo} /></Link>
          </div>
        </div>
        <div className="navbar-inner">
          <ul className="nav navbar-nav">
            <li><Link to="/">Página inicial</Link></li>
            {
              (!props.auth.isAuthenticated) 
                ? [
                  <li><Link to="/quem-somos">Quem somos</Link></li>,
                  <li><Link to="/servicos">Serviços</Link></li>,
                  <li><Link to="/contato">Contato</Link></li>
                ] : [
                  <li><Link to="/alunos">Alunos</Link></li>,
                  <li><Link to="/escolas">Escolas</Link></li>,
                  <li><Link to="/grupos">Grupos</Link></li>
                ]
            }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {
              (!props.auth.isAuthenticated) 
                ? [
                  <li><Link to="/login"><span className="glyphicon glyphicon-log-in" /> Entrar</Link></li>
                ] : [
                  <li><Link to="/usuario/"><span className="glyphicon glyphicon-user" /> Bem-vindo, {props.auth.user.name}</Link></li>,
                  <li><a onClick={() => { props.logout(); }}>
                    <span className="glyphicon glyphicon-log-out" /> Sair
                  </a></li>
                ]
            }
          </ul>
        </div></div>
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
