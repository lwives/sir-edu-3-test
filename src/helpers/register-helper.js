
export const handleChange = (event, id, valueParam) => {
    let name = '';
    let value = null;

    if (event) {
        name = event.target.name;
        value = event.target.value;
    } else {
        name = id;
        value = valueParam;
    }
    this.addStudentTemporario(name, value)
    this.forceUpdate()
}

// export const handleNext = (data) => {
//     if (data.step < data.tabs.length) {
//         this.setState({ stepIndex: stepIndex + 1 })
//     }
// }

// export const handlePrev = () => {
//     const { stepIndex } = this.state
//     if (stepIndex > 0) {
//         this.setState({ stepIndex: stepIndex - 1 })
//     }
// }
