import apisauce from 'apisauce'
import config from '../config.js'

const alpacaApi = (baseURL = config.BASE_URL) => {

    const api = apisauce.create({
        baseURL: config.BASE_URL,
        headers: {
            'APCA-API-KEY-ID': config.ALPACA_API_KEY_ID,
            'APCA-API-SECRET-KEY': config.ALPACA_API_SECRET_KEY
        },
        timeout: 5000
    })

    const getAccount = () => api.get('v2/account')
    const getPositions = () => api.get('v2/positions')
    const getActivities = () => api.get('v2/account/activities')
    const postOrders = (data) => api.post('/v2/orders', data)

    return {
        getAccount,
        getPositions,
        getActivities,
        postOrders
    }
}

export default alpacaApi