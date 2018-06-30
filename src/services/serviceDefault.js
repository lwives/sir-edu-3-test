import axios from './axios-config'

export default class serviceDefault {
    getAll(route) {
        return axios.get(route)
    }
    
    save(route, register) {
        return axios.post(route, register)
    }

    get(route, id) {
        return axios.get(route + '/' + id)
    }
}
