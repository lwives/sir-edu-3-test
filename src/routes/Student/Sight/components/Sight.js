import React from 'react'
import Slider from 'components/Slider'
import TinyMCE from 'react-tinymce'
import Paper from 'material-ui/Paper'
import { browserHistory } from 'react-router'
import { DatePicker, RaisedButton } from 'material-ui'; // FlatButton, MenuItem, Menu, Popover 
//import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import './Sight.scss'
import SliderItem from 'components/Slider/SliderItem';
import LoadingSpinner from 'components/LoadingSpinner';
import { Alert } from 'react-bootstrap'
import RegisterLayout from '../../../../layouts/RegisterLayout';
import TextFieldDefault from '../../../../components/TextFieldDefault';

const paperStyle = {
    marginBotton: 400
};

const filesCarousel = (items, actions) => {
    return items.map((item, index) => (
        <div key={index}>
            <SliderItem item={item} editable={true} actions={actions} />
        </div>)
    )
}

const searchStudent = (students, id) => {
    let student = students.filter((student) => student._id === id);
    return student.length > 1 ? null : student[0];
}

class Sight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            judgement: {
                studentId: this.props.params.id || '',
                title: '',
                date: '',
                text: ''
            },
            student: ''
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleInsertLink = this.handleInsertLink.bind(this);
        this.tabs = []
        this.data = {
            tabs: this.tabs,
            setStepIndex: this.handleSetStepindex,
            handleSubmit: this.handleSubmit,
            handleNext: this.handleNext,
            handlePrev: this.handlePrev,
            step: this.state.stepIndex,
            modo: this.props.params.modo
          }
    }

    handleSetStepindex = (newState) => {
        this.setState({ stepIndex: newState })
      }
    
      handleSubmit = (form) => {
        switch (this.props.params.modo) {
          case 'editar':
            this.props.editAdaptation(form)
            break
          case 'excluir':
            this.props.deleteAdaptation(form)
            break
          case 'inserir':
          default:
            this.props.insertAdaptation(form)
            break
        }
      }
    
      handleNext = () => {
        const { stepIndex } = this.state
        if (stepIndex < 3) {
          this.setState({ stepIndex: stepIndex + 1 })
        }
      }
    
      handlePrev = () => {
        const { stepIndex } = this.state
        if (stepIndex > 0) {
          this.setState({ stepIndex: stepIndex - 1 })
        }
      }

    componentDidMount() {
        const { getFiles, params, files, students } = this.props;

        if (!files.list.length) {
            getFiles(params.id);
        }
    }

    handleEditorChange = (e) => {
        this.setState({
            judgement: {
                ...this.state.judgement,
                text: e.target.getContent().trim()
            }
        });
    }

    handleChange(key, value) {
        this.setState({
            judgement: {
                ...this.state.judgement,
                [key]: value
            }
        });
    }

    handleCancel() {
        browserHistory.push('/aluno/' + this.props.params.id);
    }

    handleSave = () => {
        this.props.saveJudgement(this.state.judgement);
    }

    handleTouchTap = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    handleInsertLink(url, text) {
        let val = '<a href=' + url + ' target="_blank">' + text + '</a>';
        // let val = '<a onclick="window.open("'+ url +'", "_blank");">' + text + '</a>';
        tinymce.activeEditor.execCommand('mceInsertContent', false, val);
    }

    shouldChangeLocation = (judgement) => {
        if (judgement.hasOwnProperty('success') && judgement.success) {
            this.props.clearJudgementState();
            browserHistory.push('/aluno/' + this.props.params.id);
        }
    }

    componentDidUpdate() {
        this.shouldChangeLocation(this.props.judgement);
    }

    render() {
        const { judgement, files, params, students } = this.props;
        let student = searchStudent(students, params.id) || {};
        const studentName = student.name + ' ' + (student.lastName || '');
        const actions = {
            insert: this.handleInsertLink
        };

        return (
            <RegisterLayout titulo="Parecer" {...this.data}>
            <div className=" sight">
            {/* <RegisterForm {this.data} {this.props.student} /> */}
                <LoadingSpinner loading={files.isFetching || judgement.isFetching} />

                <div className="row student-info">
                    
                        <div className="col-md-6">
                            <TextFieldDefault
                                value={this.state.judgement.title || ''}
                                fieldDescription="Título"
                                name="title"
                                onChange={(evt, value) => { this.handleChange('title', value) }}
                            />
                        </div><div className="col-md-6">
                            <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                                locale="pt-br"
                                name="date"
                                onChange={(evt, value) => { this.handleChange('date', value.toISOString()) }}
                                floatingLabelText="Data"
                            />
                        </div>
                    
                    <div className="col-md-12 text-area">
                        <Paper style={paperStyle} zDepth={5}>
                            <TinyMCE
                                content={this.state.judgement.text}
                                config={{
                                    plugins: 'link paste autoresize',
                                    toolbar: 'undo redo | bold italic | link | alignleft aligncenter alignright',
                                    autoresize_max_height: 1500,
                                    statusbar: false
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </Paper>
                    </div>

                </div>
                <div className="row slider">
                    {
                        files.list.length > 0
                            ? <Slider>
                                {filesCarousel(files.list, actions)}
                              </Slider>
                            : <Alert bsStyle="warning">
                                <strong>Aviso:</strong> Nenhum arquivo cadastrado2
                              </Alert>
                    }
                </div>
                <div className="row actions pull-right">
                    <RaisedButton className="btn-actions" label="Cancelar" onClick={this.handleCancel} />
                    <RaisedButton label="Salvar" primary={true} onClick={this.handleSave} />
                </div>
            </div>
            </RegisterLayout>
        );
    }
}

export default Sight;
