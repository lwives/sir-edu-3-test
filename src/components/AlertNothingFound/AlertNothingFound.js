import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertNothingFound = ({textNothingFound = "nada encontrado."}) => {
  return (
    <Alert bsStyle="warning">
      <strong>Aviso: </strong>{textNothingFound}
    </Alert>
  )
}

export default AlertNothingFound
