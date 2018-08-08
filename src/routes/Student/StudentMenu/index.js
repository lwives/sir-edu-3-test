import StudentMenuContainer from './containers/StudentMenuContainer'
import StudentFiles from '../../StudentFiles'
import SightRoute from '../../Sight'
import StudentAdaptation from '../StudentAdaptation';
import StudentAttendance from '../StudentAttendance';
import StudentPlan from '../StudentPlan';

export default {
    path: 'aluno/:id',
    pathWithoutParam: '/aluno/',
    component: StudentMenuContainer,
    childRoutes: [StudentFiles, SightRoute, StudentAdaptation, StudentAttendance, StudentPlan]
}
