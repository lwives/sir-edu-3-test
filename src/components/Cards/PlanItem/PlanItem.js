import React from 'react'
import { RaisedButton, FlatButton, DatePicker, TextField, Paper } from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import './PlanItem.scss'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class PlanItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const { item, editable, students, loggedUser } = this.props;
        const date = new Date(item.date);
        const displayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const student = students.selectedStudent;
        const dados = {
            'TypeDescription' : 'P.D.I.',
            'date' : displayDate,
            'title' : item.title,
            'description' : item.text
        };

        return (
            <div className="plan-item">
                <Card style={{margin: 5}}>
                    <div style={{height: 125, padding: '16px', cursor: 'pointer'}} onClick={() => { this.setState({open: true}) }}>
                        <div className="pull-left" >
                            <em  className="fa fa-pencil-square-o"
                                aria-hidden="true"
                                style={{margin:0, fontSize:'7em'}}>
                            </em>
                        </div>
                        <div style={{paddingTop: 46}}>
                            <strong>{dados.TypeDescription}</strong>
                            <CardTitle style={{padding: '0'}} subtitle={dados.title || ''}/>
                        </div>
                    </div>
                    <CardTitle subtitle={dados.displayDate} style={{padding: '2px 16px 5px'}}/>
                    <CardText style={cardTextStyle}>
                        <div dangerouslySetInnerHTML={{__html: dados.text}}/>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Editar"/>
                        <FlatButton label="Remover" secondary={true} />
                    </CardActions>
                </Card>
                <Modal show={this.state.open} onHide={this.close} backdrop="static" dialogClassName="plan-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar Adequação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="plan-content">
                            <Paper className="container-fluid plan-text" zDepth={4}>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h5>{student.school}</h5>
                                    </div>
                                    <div className="col-md-12 text-center title">
                                        <h1>Adequação 2</h1>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Nome:</label> {student.name}
                                    </div>
                                    <div className="col-md-2">
                                        <label>Turma:</label> {student.classNumber || ''}
                                    </div>
                                    <div className="col-md-3">
                                        <label>Data de nascimento:</label> {student.birthDate || ''}
                                    </div>
                                    <div className="col-md-4">
                                        <label>Professor(a):</label> {loggedUser.user.name + ' ' + (loggedUser.user.lastName || '')}
                                    </div>
                                </div>
                                <div className="row text-container">
                                    <div className="col-md-5">
                                        <label>Data:</label> {displayDate}
                                    </div>
                                    <div className="col-md-12 text" dangerouslySetInnerHTML={{__html: item.text}}/>
                                </div>
                            </Paper>
                            <div className="btn-generate-pdf text-center">
                                <RaisedButton label="Gerar PDF" primary={true}/>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    students: state.students,
    loggedUser: state.auth
})

export default connect(mapStateToProps, {})(PlanItem)
