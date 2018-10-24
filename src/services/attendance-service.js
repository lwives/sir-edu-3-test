import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class attendanceService {
    static getAttendances() {
        return axios.get(Route.Attendance)
    }

    static formatAttendance(attendance) {
        let newAttendance = new FormData();
        Object.keys(attendance).forEach((key) => {
            if (attendance[key].constructor !== Array) {
                newAttendance.append(key, attendance[key])
            } else {
                newAttendance.append(key, attendance[key].toString())
            }
        })
        console.log('formatAttendance', newAttendance);
        return newAttendance
    }
    static insertAttendance(attendance) {
        let newAttendance = this.formatAttendance(attendance)
        return axios.post(Route.Attendance, newAttendance)
    }
    
    static editAttendance(attendance) {
        let editAttendance = this.formatAttendance(attendance)
        return axios.put(Route.Attendance + '/' + attendance._id, editAttendance)
    }
    static deleteAttendance(attendance) {
        let editAttendance = this.formatAttendance(attendance)
        return axios.delete(Route.Attendance + '/' + attendance._id, editAttendance)
    }

    static getAttendance(id) {
        return axios.get(Route.Attendance + '/' + id)
    }
}
//'attendances/'
