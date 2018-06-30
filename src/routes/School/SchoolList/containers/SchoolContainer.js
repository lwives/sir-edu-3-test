import { connect } from 'react-redux'

import SchoolListTable from '../components/SchoolListTable'
import { getSchoolsList, filterSchools, setSelectedSchool } from 'store/schools'

const mapDispatchToProps = {
    getSchoolsList,
    filterSchools,
    setSelectedSchool
}

const mapStateToProps = (state) => ({
    schools: state.schools,
    filterText: state.schools.filterText
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolListTable)
