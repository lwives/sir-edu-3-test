import React from 'react'
import { FlatButton, RaisedButton } from 'material-ui'

export default class StepperPagination extends React.Component {
    static propTypes = {
        step: React.PropTypes.number.isRequired,
        handlePrev: React.PropTypes.func.isRequired,
        handleNext: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="stepper-pagination">
                <FlatButton
                    label="Voltar"
                    disabled={this.props.step === 0}
                    onTouchTap={this.props.handlePrev}
                    style={{ marginRight: 12 }}
                />
                <RaisedButton
                    label="Próximo"
                    disabled={this.props.step === 3}
                    primary
                    onTouchTap={this.props.handleNext}
                />
            </div>
        )
    }
}
