import React from 'react'
import HeaderDefault from '../../components/HeaderDefault'
import './RegisterLayout.scss'
import '../../styles/core.scss'
import RegisterStepper from '../../components/RegisterStepper'
import StepperPagination from '../../components/StepperPagination'

export const RegisterLayout = ({ children, titulo, ...data }) => {
  return (
    <div className="container container-register">
      <HeaderDefault texto={titulo} type="h1" />
      <div className="row">
        <div className="col">
          <RegisterStepper {...data} />
          {children}
          <StepperPagination {...data} />
        </div>
      </div>
    </div>
  )
}

RegisterLayout.propTypes = {
  titulo: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
}

export default RegisterLayout
