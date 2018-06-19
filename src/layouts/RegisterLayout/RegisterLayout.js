import React from 'react'
import HeaderDefault from '../../components/HeaderDefault'
import './RegisterLayout.scss'
import '../../styles/core.scss'
import RegisterStepper from '../../components/RegisterStepper'
import StepperPagination from '../../components/StepperPagination'

export const RegisterLayout = ({ children, titulo, ...data }) => {
  return (
  <div className="container container-register">
    <div className="col-md-12">
      <HeaderDefault texto={titulo} type="h1" />
    </div>
    <div className="col-md-12">
      <RegisterStepper {...data} />
      {children}
      <StepperPagination {...data} />
    </div>
  </div>
  )
}

RegisterLayout.propTypes = {
  titulo: React.PropTypes.string.isRequired,
  children : React.PropTypes.element.isRequired
}

export default RegisterLayout
