import React from 'react'
import HeaderDefault from '../../components/HeaderDefault'
import './StudentLayout.scss'
import '../../styles/core.scss'
import RegisterStepper from '../../components/RegisterStepper'
import StepperPagination from '../../components/StepperPagination'
import LoadingSpinner from '../../components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'

export default class StudentLayout extends React.Component {
  //children, titulo, ...data }) => {

  render() {
    const student = students.selectedStudent;
    return (
      <div className="container container-student">
        <LoadingSpinner loading={files.isFetching || judgements.isFetching} />
        {student ? <StudentHeader student={student} /> : null}

        <HeaderDefault texto={titulo} type="h1" />
        <div className="row">
          <div className="col">
            <RegisterStepper {...data} />
            {children}
            <StepperPagination {...data} />
          </div>
        </div>
        <div className="col-md-12 timeline">
          {timelineList.length > 0 &&
            <Slider className="col-md-12">
              {timelineCarousel(timelineList)}
            </Slider>
          }
        </div>
      </div>
    )
  }
}

StudentLayout.propTypes = {
  titulo: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
}

export default StudentLayout
