import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class studentService {
    static getStudents() {
        return axios.get(Route.Student)
    }

    static formatStudent(student) {
        let newStudent = new FormData();
        Object.keys(student).forEach((key) => {
            if (student[key].constructor !== Array) {
                newStudent.append(key, student[key])
            } else {
                newStudent.append(key, student[key].toString())
            }
        })
        console.log('formatStudent', newStudent);
        return newStudent
    }
    static insertStudent(student) {
        let newStudent = this.formatStudent(student)
        return axios.post(Route.Student, newStudent)
    }
    
    static editStudent(student) {
        let editStudent = this.formatStudent(student)
        return axios.put(Route.Student + '/' + student._id, editStudent)
    }
    static deleteStudent(student) {
        let editStudent = this.formatStudent(student)
        return axios.delete(Route.Student + '/' + student._id, editStudent)
    }

    static getStudent(id) {
        return axios.get(Route.Student + '/' + id)
    }
}
//'students/'
