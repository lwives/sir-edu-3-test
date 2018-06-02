// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import StudentRoute from './Student/StundentList'
import StudentRegisterRoute from './Student/StudentRegister'
import StudentMenu from './Student/StudentMenu'
import UserRegisterRoute from './User/UserRegister'
import SchoolRoute from './School/SchoolList'
import SchoolRegisterRoute from './School/SchoolRegister'
import GroupRoute from './Group/GroupList'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    LoginRoute,
    StudentRoute,
    StudentRegisterRoute,
    StudentMenu,
    UserRegisterRoute,
    SchoolRoute,
    SchoolRegisterRoute,
    GroupRoute
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
