
export const setDefaultValue = (defaultValue, addRegister, getRegister) => {
    const someValueDefaultPrevious = defaultValue.some((column, index) => {
        return getRegister(Object.keys(column)[0])
    })
    if (!someValueDefaultPrevious) {
        defaultValue.forEach((column, index) => {
            addRegister(column)
        })
    }
}

export const handleChangeHelper = (event, id, valueParam) => {
    let name = '';
    let value = null;
    console.log(event.target);
    
    if (event) {
        name = event.target.name;
        value = event.target.value;
    } else {
        name = id;
        value = valueParam;
    }
    return { [name]: value }
}

export const addRegister = (state, key, content) => {
    return {
        ...state,
        [key]: content
    }
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
