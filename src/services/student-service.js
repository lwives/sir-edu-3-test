import axios from './axios-config'
import Route from '../../api/constants/api-routes'

 export default class studentService {
    static getStudents() {
        return axios.get(Route.Student)
    }

    static saveStudent(student) {
        let newStudent = new FormData();

        Object.keys(student).forEach((key) => {
            if (student[key].constructor !== Array) {
                newStudent.append(key, student[key])
            } else {
                newStudent.append(key, student[key].toString())
            }
        })
        
        return axios.post(Route.Student, newStudent)
    }

    static getStudent(id) {
        return axios.get(Route.Student + '/' + id)
    }
}
//'students/'
