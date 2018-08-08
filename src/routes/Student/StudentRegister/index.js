import StudentRegisterContainer from './containers/StudentRegisterContainer'

// Sync route definition
export default {
    path:'aluno/register(/:id)(/:modo)',
    pathWithoutParam:'/aluno/register/',
    component : StudentRegisterContainer
}
