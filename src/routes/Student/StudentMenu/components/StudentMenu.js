import React, { PropTypes } from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem'
import LoadingSpinner from 'components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'
import HeaderDefault from '../../../../components/HeaderDefault'

const timelineCarousel = (items) => {
    return items.map((item, index) => (
        <div key={index}>
            <SliderItem item={item} editable={false} />
        </div>)
    )
}

export default class StudentMenu extends React.Component {
    static propTypes = {
        getFiles: PropTypes.func,
        getJudgements: PropTypes.func,
        getAdaptations: PropTypes.func,
        getAttendances: PropTypes.func,
        getPlans: PropTypes.func,
        routeParams: PropTypes.object,
        location: PropTypes.object,
        children: PropTypes.object,
        students: PropTypes.object,
        judgements: PropTypes.object,
        files: PropTypes.object,
        adaptations: PropTypes.object,
        attendances: PropTypes.object,
        plans: PropTypes.object
    }

    componentDidMount() {
        const { getFiles, getJudgements, routeParams, getAdaptations, getAttendances, getPlans } = this.props;
        getFiles(routeParams.id);
        getJudgements(routeParams.id);
        getAdaptations(routeParams.id);
        getAttendances(routeParams.id);
        getPlans(routeParams.id);
    }

    render() {
        const { students, judgements, files, adaptations, attendances, plans } = this.props;
        let timelineList = judgements.list.concat(files.list);
        timelineList = adaptations.list.concat(timelineList);
        timelineList = attendances.list.concat(timelineList);
        timelineList = plans.list.concat(timelineList);
//console.log(adaptations, attendances);

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
                <LoadingSpinner loading={files.isFetching || judgements.isFetching || adaptations.isFetching} />
                {student ? <StudentHeader student={student} /> : null}
                <div className="container">
                    {
                        this.props.children
                            ? this.props.children
                            : <div className="row student-menu">
                                <HeaderDefault type="h1" texto="Menu de Registros" />
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
