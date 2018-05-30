import React, {PropTypes} from 'react'
import { Stepper, Step, StepButton } from 'material-ui/Stepper'

class RegisterStepper extends React.Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        setStepIndex: PropTypes.func.isRequired,
        tabs: PropTypes.array
        // .object.shape({
        //     name: PropTypes.string
        // }).isRequired
    }

    render() {
        const { tabs, step, setStepIndex } = this.props
        return (
            <Stepper linear={false} activeStep={step} >
                {
                    tabs.map((tab = { name: '' }, index) => {
                        return (<Step key={tab.name}>
                            <StepButton onClick={() => setStepIndex(index)}>
                             {/* {() => false}>  */}
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
