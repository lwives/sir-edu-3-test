import { connect } from 'react-redux'
import { insertPlan, editPlan, deletePlan, getPlan } from 'store/plans'
import StudentPlan from '../components/StudentPlan'

const mapDispatchToProps = {
    insertPlan,
    getPlan,
    editPlan,
    deletePlan
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentPlan)
