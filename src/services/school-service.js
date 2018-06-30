import serviceDefault from './serviceDefault'
import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class SchoolService extends serviceDefault {
    static getSchools() {
        console.log('Service Schools List');
        
        return axios.get('/schools')
    }
//Route.School
    static saveSchool(school) {
        let newSchool = new FormData();

        Object.keys(school).forEach((key) => {
            if (school[key].constructor !== Array) {
                newSchool.append(key, school[key])
            } else {
                newSchool.append(key, school[key].toString())
            }
        })
        
        return axios.post(Route.School, newSchool)
    }

    static getSchool(id) {
        console.log('getSchool', id);
        
        return axios.get('/schools' + '/' + id)
    }
}
