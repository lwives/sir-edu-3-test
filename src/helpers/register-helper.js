import React from 'react'


export const handleNext = (data) => {
    if (data.step < data.tabs.length) {
        this.setState({ stepIndex: stepIndex + 1 })
    }
}

export const handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
        this.setState({ stepIndex: stepIndex - 1 })
    }
}
