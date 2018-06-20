import StudentMenuContainer from './containers/StudentMenuContainer'
import StudentFiles from '../../StudentFiles'
import SightRoute from '../../Sight'

export default {
    path: 'aluno/show/:id',
    pathWithoutParam: '/aluno/show/',
    component: StudentMenuContainer,
    childRoutes : [StudentFiles, SightRoute]
}
