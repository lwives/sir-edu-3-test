import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './Footer.scss'
import logo from './assets/sir-edu_logo.png'

import Home from '../../routes/Home'
import Paginas from '../../pages'

const Footer = (pros) => {
    return (
        <div className="container-fluid footer">
            <div className="navbar-brand navbar-footer ml-3 ml-md-1">
                <Link to={Home.pathWithoutPath}><img id="header-logo" src={logo} /> </Link>
                SR-Edu - Sistema integrado de recursos educacionais - 2018
            </div>
            <div className="navbar-inner collapse navbar-collapse" id="navbarMenuItens">
                <ul className="nav nav-menu navbar-nav navbar-right">
                    <li className={'nav-item'} key="termos"><Link to={Paginas.Termos.pathWithoutParam}>Termo de uso e privacidade</Link></li>
                    <li className={'nav-item'} key="sobre"><Link to={Paginas.Sobre.pathWithoutParam}>Sobre</Link></li>
                </ul>
                </div>
            {/* SR-Edu - Sistema integrado de recursos educacionais para a gestão do acompanhamento de alunos com necessidades especiais. */}
        </div>
    )
}

export default Footer;
