import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Footer from '../../components/Footer'

export const CoreLayout = ({ children }) => {
  const user = {}
  return (
    <div className="main">
      <Header user={user} />
      <div className="container ">
        {children}
      </div>
      <Footer user={user} />
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
