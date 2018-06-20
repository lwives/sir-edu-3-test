import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class SchoolService {
    static register(school) {
        return axios.post('register', {
            ...school
        });
    }

    static getSchools() {
        return axios.get(Route.School)
    }

    static saveSchool(school) {
        let newSchool = new FormData();

        Object.keys(school).forEach((key) => {
            if (School[key].constructor !== Array) {
                newSchool.append(key, school[key])
            } else {
                newSchool.append(key, school[key].toString())
            }
        })
        
        return axios.post(Route.School, newSchool)
    }

    static getSchool(id) {
        return axios.get(Route.School + '/' + id)
    }
}
//'students/'
