import axios from './axios-config'
import Route from '../../api/constants/api-routes'

export default class adaptationService {
    static getAdaptations() {
        return axios.get(Route.Adaptation)
    }

    static formatAdaptation(adaptation) {
        let newAdaptation = new FormData();
        Object.keys(adaptation).forEach((key) => {
            if (adaptation[key].constructor !== Array) {
                newAdaptation.append(key, adaptation[key])
            } else {
                newAdaptation.append(key, adaptation[key].toString())
            }
        })
        console.log('formatAdaptation', newAdaptation);
        return newAdaptation
    }
    static insertAdaptation(adaptation) {
        let newAdaptation = this.formatAdaptation(adaptation)
        return axios.post(Route.Adaptation, newAdaptation)
    }
    
    static editAdaptation(adaptation) {
        let editAdaptation = this.formatAdaptation(adaptation)
        return axios.put(Route.Adaptation + '/' + adaptation._id, editAdaptation)
    }
    static deleteAdaptation(adaptation) {
        let editAdaptation = this.formatAdaptation(adaptation)
        return axios.delete(Route.Adaptation + '/' + adaptation._id, editAdaptation)
    }

    static getAdaptation(id) {
        return axios.get(Route.Adaptation + '/' + id)
    }
}
//'adaptations/'
