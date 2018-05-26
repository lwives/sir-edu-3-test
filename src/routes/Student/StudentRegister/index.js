import StudentRegisterContainer from './containers/StudentRegisterContainer'

// Sync route definition
export default {
    path:'aluno/:id/:modo',
    pathWithoutParam:'aluno/',
    component : StudentRegisterContainer
}
