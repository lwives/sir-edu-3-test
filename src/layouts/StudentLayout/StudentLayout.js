import React from 'react'
import './StudentLayout.scss'
import '../../styles/core.scss'
import LoadingSpinner from '../../components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'
import Slider from '../../components/Slider'
import SliderItem from '../../components/Slider/SliderItem'

const filesCarousel = (items, actions) => {
  return items.map((item, index) => (
      <div key={index}>
          <SliderItem item={item} editable={true} actions={actions} />
      </div>)
  )
}
const timelineCarousel = (items) => {
  return items.map((item, index) => (
      <div key={index}>
          <SliderItem item={item} editable={false} />
      </div>)
  )
}

export default class StudentLayout extends React.Component {
  //children, titulo, ...data }) => {

  render() {
    const { files, judgements, students, children } = this.props
    //const student = students.selectedStudent;
    return (
      <div className="container container-student">
        {children}
        <div className="col-md-12 timeline">
          {timelineList.length > 0 &&
            <Slider className="col-md-12">
              {timelineCarousel(timelineList)}
            </Slider>
          }
        </div>
      </div>
    )
//     <div className="row slider">
//     {
//         files.list.length > 0
//             ? <Slider>
//                 {filesCarousel(files.list, actions)}
//               </Slider>
//             : <Alert bsStyle="warning">
//                 <strong>Aviso:</strong> Nenhum arquivo cadastrado2
//               </Alert>
//     }
// </div>
  }
}

StudentLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}
