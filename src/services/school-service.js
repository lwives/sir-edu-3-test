import serviceDefault from './serviceDefault'
import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class SchoolService extends serviceDefault {
    static getSchools() {
        console.log('Service Schools List');

        return axios.get('/schools')
    }
    //Route.School
    static formatSchool(school) {
        let newSchool = new FormData();

        Object.keys(school).forEach((key) => {
            if (school[key].constructor !== Array) {
                newSchool.append(key, school[key])
            } else {
                newSchool.append(key, school[key].toString())
            }
        })
    }
    
    static insertSchool(school) {
        let newSchool = this.formatSchool(school)
        return axios.post(Route.School, newSchool)
    }
    
    static editSchool(school) {
        let editSchool = this.formatSchool(school)
        return axios.put(Route.School + '/' + school._id, editSchool)
    }

    static deleteSchool(school) {
        let editSchool = this.formatSchool(school)
        return axios.delete(Route.School + '/' + school._id, editSchool)
    }

    static getSchool(id) {
        console.log('getSchool', id);

        return axios.get('/schools' + '/' + id)
    }
}
