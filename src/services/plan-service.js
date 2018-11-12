import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class planService {
    static getPlans(studentId) {
        return axios.get(Route.Plan, {
            params: { studentId }
        })
    }

    static formatPlan(plan) {
        let newPlan = new FormData();
        Object.keys(plan).forEach((key) => {
            if (plan[key].constructor !== Array) {
                newPlan.append(key, plan[key])
            } else {
                newPlan.append(key, plan[key].toString())
            }
        })
        console.log('formatPlan', newPlan);
        return newPlan
    }
    static insertPlan(plan) {
        let newPlan = this.formatPlan(plan)
        return axios.post(Route.Plan, newPlan)
    }
    
    static editPlan(plan) {
        let editPlan = this.formatPlan(plan)
        return axios.put(Route.Plan + '/' + plan._id, editPlan)
    }
    static deletePlan(plan) {
        let editPlan = this.formatPlan(plan)
        return axios.delete(Route.Plan + '/' + plan._id, editPlan)
    }

    static getPlan(id) {
        return axios.get(Route.Plan + '/' + id)
    }
}
//'plans/'
