// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
//import PageRoute from './pages'
import LoginRoute from './Login'
import StudentList from './Student/StudentList'
import StudentRegister from './Student/StudentRegister'
import StudentMenu from './Student/StudentMenu'
import UserRegister from './User/UserRegister'
import SchoolRoute from './School/SchoolList'
import SchoolRegister from './School/SchoolRegister'
import GroupRoute from './Group/GroupList'
import TestRoute from './testRegister'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    // PageRoute.quemSomos, 
    // PageRoute.servico, 
    // PageRoute.contato, 
    // PageRoute.termos, 
    // PageRoute.sobre, 
    LoginRoute,
    StudentList,
    StudentRegister,
    StudentMenu,
    UserRegister,
    SchoolRoute,
    SchoolRegister,
    GroupRoute,
    TestRoute
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
