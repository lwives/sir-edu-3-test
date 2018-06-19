import React from 'react'
import { FlatButton, RaisedButton } from 'material-ui'

export default class StepperPagination extends React.Component {
    static propTypes = {
        step: React.PropTypes.number.isRequired,
        handlePrev: React.PropTypes.func.isRequired,
        handleNext: React.PropTypes.func.isRequired,
        tabs: React.PropTypes.array
    }

    render() {
        return (
            <div className="stepper-pagination text-center">
                {this.props.tabs && this.props.tabs.length > 1 &&
                    <div>
                        <FlatButton
                            label="Voltar"
                            disabled={this.props.step === 0}
                            onTouchTap={this.props.handlePrev}
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label="Próximo"
                            disabled={this.props.step === (this.props.tabs.length - 1)}
                            primary
                            onTouchTap={this.props.handleNext}
                        />
                    </div>
                }
            </div>
        )
    }
}
