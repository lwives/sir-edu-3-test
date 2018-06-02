import React from 'react'
import HeaderDefault from '../../components/HeaderDefault'
import './RegisterLayout.scss'
import '../../styles/core.scss'

export const RegisterLayout = ({ children, titulo }) => {
  return (
  <div className="container container-register">
    <div className="col-md-12">
      <HeaderDefault texto={titulo} type="h1" />
      {children}
    </div>
  </div>
  )
}

RegisterLayout.propTypes = {
  titulo: React.PropTypes.string.isRequired,
  children : React.PropTypes.element.isRequired
}

export default RegisterLayout
