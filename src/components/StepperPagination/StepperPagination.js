import React from 'react'
import { FlatButton, RaisedButton } from 'material-ui'

const StepperPagination = (data) => {
    return (
        <div className="stepper-pagination text-center">
            {data.tabs && data.tabs.length > 1 &&
                <div>
                    <FlatButton
                        label="Voltar"
                        disabled={data.step === 0}
                        onTouchTap={data.handlePrev}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label="Próximo"
                        disabled={data.step === (data.tabs.length - 1)}
                        // color="primary"
                        className="btn btn-primary"
                        onTouchTap={data.handleNext}
                    />
                </div>
            }
        </div>
    )
}

StepperPagination.propTypes = {
    step: React.PropTypes.number.isRequired,
    handlePrev: React.PropTypes.func.isRequired,
    handleNext: React.PropTypes.func.isRequired,
    tabs: React.PropTypes.array
}

export default StepperPagination
