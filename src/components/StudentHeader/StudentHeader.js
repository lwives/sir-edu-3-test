import React from 'react'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import defaultAvatar from 'public/default-avatar.png'
import './StudentHeader.scss'

export default class StudentHeader extends React.Component {

    render() {
        const { student } = this.props;
        console.log("Perfil do esdudante", student);
        

        return (
            <nav className="container-fluid navbar navbar-default student-header">
                <div className="col-md-1">
                    {
                    student.avatar ?
                    <img className="thumbnail avatar" src={'/' + student.avatar.path}/> :
                    <img className="thumbnail avatar" src={defaultAvatar}/>
                    }
                </div>
                <div className="col-md-4">
                    <TextField floatingLabelText="Nome:" value={student.name} underlineShow={false} />
                    <Divider />
                </div>
                <div className="col-md-4">
                    <TextField floatingLabelText="Escola:" value={student.school || ' '} underlineShow={false} />
                    <Divider />
                </div>
                <div className="col-md-1">
                    <TextField floatingLabelText="Turma:" value={student.classNumber || ' '} underlineShow={false} />
                    <Divider />
                </div>
                <div className="col-md-2">
                    <TextField floatingLabelText="Matrícula:" value={student.registration || ' '} underlineShow={false} />
                    <Divider />
                </div>                             
            </nav>
        );
    }
}
