import React from 'react'
import { Link } from 'react-router'
import './StudentMenu.scss'

export const MenuItem = (props) => (
    <div className="row menu-items">
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + '/arquivos'}>
                    <div className="icons-box">
                        <i className="fa fa-camera fa-3x" aria-hidden="true"></i>
                    </div>
                    <h4>Fotos/Vídeos</h4>
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <Link to={props.location.pathname + '/parecer'}>
                    <div className="icons-box">
                        <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                    </div>
                    <h4>Parecer</h4>
                </Link>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <div className="icons-box">
                    <i className="fa fa-id-card-o fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Atendimento</h4>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <div className="icons-box">
                    <i className="fa fa-file-text-o fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Adequação Curricular</h4>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <div className="icons-box">
                    <i className="glyphicon glyphicon-list-alt fa-3x" aria-hidden="true"></i>
                </div>
                <h4>P.D.I</h4>
            </div>
        </div>
        <div className="col-md-2">
            <div className="menu-item">
                <div className="icons-box">
                    <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                </div>
                <h4>Aluno</h4>
            </div>
        </div>
    </div>
);

export default MenuItem;