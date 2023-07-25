import { DOMAIN } from '../controllers/callAPI/api.js'

function callAPI () {
    let promise = axios({
        url: DOMAIN,
        method: 'GET'
    })
    return promise
}

export {callAPI}
