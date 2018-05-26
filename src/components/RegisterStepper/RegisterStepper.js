import React from 'react'
import { Stepper, Step, StepButton } from 'material-ui/Stepper'

class RegisterStepper extends React.Component {
    constructor(props) {
        super(props)
        this.stepIndex = this.props.stepIndex 
        //const state = {stepIndex}
        this.tabs = this.props.tabs;
    }

    render() {
        return (
            <Stepper linear={false} activeStep={this.stepIndex} >
                {
                    this.tabs.map((tab = { name: '' }, index) => {
                        return (<Step>
                            <StepButton onClick={() => this.setState({ stepIndex: index })}>
                                {tab.name}
                            </StepButton>
                        </Step>)
                    })
                }
            </Stepper>
        )
    }
}

export default RegisterStepper
