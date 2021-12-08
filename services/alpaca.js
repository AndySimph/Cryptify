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

    // const create_order = (symbol, qty, side, type, time_in_force) => api.get('v2/orders')
    //     data = {
    //         "symbol": symbol,
    //         "qty": qty,
    //         "side": side,
    //         "type": type,
    //         "time_in_force": time_in_force
    //     }
    //     api.post(ORDERS_URL, data, header=HEADERS)

    return {
        getAccount,
        getPositions,
        getActivities
    }
}

export default alpacaApi