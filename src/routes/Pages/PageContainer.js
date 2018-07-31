import React from 'react'
import { logo } from '../../../src/constants/configConstants'

class PageContainer {
    render() {
        return (
            <div className="text-center" >
                <img className="logo" src={logo} />
                <h4 className="title">Página Padrão</h4>
            </div>
        )
    }
}

export default PageContainer
