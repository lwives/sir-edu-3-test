import React, { PropTypes } from 'react'

export default class HeaderDefault extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    texto: PropTypes.string
  }

  render() {
    const { type, texto } = this.props
    let element
    switch (type) {
      case 'h1':
        element = <h1>{texto}</h1>
        break;
      case 'h4':
        element = <h4>{texto}</h4>
        break;

      default:
        element = <h2>{texto}</h2>
        break;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          {element}
        </div>
      </div>
    )
  }
}
