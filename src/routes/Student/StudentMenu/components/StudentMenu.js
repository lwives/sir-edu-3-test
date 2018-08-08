import React, { PropTypes } from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem'
import LoadingSpinner from 'components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'
import HeaderDefault from '../../../../components/HeaderDefault'
import StudentAdaption from '../../StudentAdaptation'
import StudentAttendance from '../../StudentAttendance'
import StudentPlan from '../../StudentPlan'

const timelineCarousel = (items) => {
    return items.map((item, index) => (
        <div key={index}>
            <SliderItem item={item} editable={false} />
        </div>)
    )
}

export default class StudentMenu extends React.Component {
    static propTypes = {
        // getFiles: PropTypes.func,
        // getJudgements: PropTypes.func,
        // routeParams: PropTypes.object,
        // location: PropTypes.string,
        // children: PropTypes.object,
        students: PropTypes.object,
        judgements: PropTypes.object,
        files: PropTypes.object

    }

    componentDidMount() {
        const { getFiles, getJudgements, routeParams } = this.props;
        getFiles(routeParams.id);
        getJudgements(routeParams.id);
    }

    render() {
        const { students, routeParams, judgements, files } = this.props;
        const timelineList = judgements.list.concat(files.list);

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

        const student = students.selectedStudent;

        return (
            <div>
                <LoadingSpinner loading={files.isFetching || judgements.isFetching} />
                {student ? <StudentHeader student={student} /> : null}
                <div className="container">
                    {
                        this.props.children
                            ? this.props.children
                            : <div className="row student-menu">
                                <HeaderDefault type="h1" texto="Menu de Registro" />
                                <div className="col-md-12">
                                    <MenuItem location={this.props.location} />
                                </div>
                                <div className="col-md-12 timeline">
                                    {timelineList.length > 0 &&
                                        <Slider className="col-md-12">
                                            {timelineCarousel(timelineList)}
                                        </Slider>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}
