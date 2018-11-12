import React from 'react'
import './StudentLayout.scss'
import '../../styles/core.scss'
import LoadingSpinner from '../../components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'
import Slider from '../../components/Slider'
import SliderItem from '../../components/Slider/SliderItem'

const filesCarousel = (items, actions) => {
  return timeline(items, actions, true);
}
const timelineCarousel = (items) => {
  return items.map((item, index) => (
      <div key={index}>
          <SliderItem item={item} editable={false} />
      </div>)
  )
}
const timeline = (items, actions, isEditable) => {
  return items.map((item, index) => (
    <div key={index}>
        <SliderItem item={item} editable={isEditable} actions={actions} />
    </div>)
  )
}

export default class StudentLayout extends React.Component {
  //children, titulo, ...data }) => {
    
    render() {
        const { files, judgements, students, children } = this.props
        //const { students, routeParams, judgements, files } = this.props;
        const timelineList = [];//judgements.list.concat(files.list);
    
        timelineList.sort((item, nextItem) => {
            let dateA = new Date(item.date);
            let dateB = new Date(nextItem.date);

            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        });
    
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
  children: React.PropTypes.element.isRequired,
  files: React.PropTypes.func,
  judgements: React.PropTypes.func,
  students: React.PropTypes.func
}
