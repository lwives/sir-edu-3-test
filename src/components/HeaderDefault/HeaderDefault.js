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
      case 'h2':
        element = <h2>{texto}</h2>
        break;
      case 'h3':
        element = <h3>{texto}</h3>
        break;
      case 'h4':
        element = <h4>{texto}</h4>
        break;
      case 'h5':
        element = <h5>{texto}</h5>
        break;
      case 'h6':
        element = <h6>{texto}</h6>
        break;
      case 'h7':
        element = <h7>{texto}</h7>
        break;

      default:
        element = <span>{texto}</span>
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
