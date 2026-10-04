import axios from "axios"
import { AXIOS_CONFIG, AXIOS_CONFIG_FORM, MODAL_BASEE_URL, SERVER_BASE_URL } from "../constants"
import { updateUserModal } from "../reducer/user_reducer"

export const apiGet = async (EndPoint, token = '') => {
    try {
        console.log(`calling api ${SERVER_BASE_URL}${EndPoint}`, AXIOS_CONFIG(token))
        const res = await axios.get(`${SERVER_BASE_URL}${EndPoint}`, AXIOS_CONFIG(token))
        console.log(`response ${EndPoint}`, res)
        if (res.status == 200) {
            return { check: true, code: 200, data: res?.data }
        }
    }
    catch (err) {
        console.log(err)
        if (err?.response) {
            if (err.response.status == 402) {
                return { check: false, code: 402, message: err.response.data }
            }
            return { check: false, code: 401, message: err.response.data }
        }
        else {
            console.log('kjfdfk', err.message)
            return { check: false, code: 401, message: err.message }
        }
    }
}

export const apiPost = async (EndPoint, data, token = '', file = false) => {
    try {
        console.log(`calling api ${SERVER_BASE_URL}${EndPoint}`, data, file ? AXIOS_CONFIG_FORM(token) : AXIOS_CONFIG(token))
        const res = await axios.post(`${SERVER_BASE_URL}${EndPoint}`, data, file ? AXIOS_CONFIG_FORM(token) : AXIOS_CONFIG(token))
        console.log(`response ${EndPoint}`, res)
        if (res.status == 200) {
            return { check: true, code: 200, data: res?.data }
        }
    }
    catch (err) {
        console.log(`Error ${EndPoint}`, err, err.response)
        if (err?.response) {
            if (err.response.status == 402) {
                return { check: false, code: 402, message: err.response.data }
            }
            return { check: false, code: 401, message: err.response.data }
        }
        else {
            console.log('kjfdfk', err.message)
            return { check: false, code: 401, message: err.message }
        }
        // if (err.response.status == 400 || err.response.status == 401) {
        //     // showToast(err.response.data.message, 'error')
        //     return false
        // }
    }
}

export const apiPut = async (EndPoint, data, token = '', file = false) => {
    try {
        console.log(`calling api ${SERVER_BASE_URL}${EndPoint}`, data, file ? AXIOS_CONFIG_FORM(token) : AXIOS_CONFIG(token))
        const res = await axios.put(`${SERVER_BASE_URL}${EndPoint}`, data, file ? AXIOS_CONFIG_FORM(token) : AXIOS_CONFIG(token))
        console.log(`response ${EndPoint}`, res)
        if (res.status == 200) {
            return { check: true, code: 200, data: res?.data }
        }
    }
    catch (err) {
        console.log(`Error ${EndPoint}`, err)
        if (err?.response) {
            if (err.response.status == 402) {
                return { check: false, code: 402, message: err.response.data }
            }
            return { check: false, code: 401, message: err.response.data }
        }
        else {
            console.log('kjfdfk', err.message)
            return { check: false, code: 401, message: err.message }
        }
        // if (err.response.status == 400 || err.response.status == 401) {
        //     // showToast(err.response.data.message, 'error')
        //     return false
        // }
    }
}

export const apiDelete = async (EndPoint, token = '') => {
    try {
        console.log(`calling api ${SERVER_BASE_URL}${EndPoint}`, AXIOS_CONFIG(token))
        const res = await axios.delete(`${SERVER_BASE_URL}${EndPoint}`, AXIOS_CONFIG(token))
        console.log(`response ${EndPoint}`, res)
        if (res.status == 200) {
            return { check: true, code: 200, data: res?.data }
        }
    }
    catch (err) {
        console.log(err)
        if (err?.response) {
            if (err.response.status == 402) {
                return { check: false, code: 402, message: err.response.data }
            }
            return { check: false, code: 401, message: err.response.data }
        }
        else {
            console.log('kjfdfk', err.message)
            return { check: false, code: 401, message: err.message }
        }
    }
}

export const apiPostModal = async (EndPoint, data) => {
    try {
        console.log(`calling api ${MODAL_BASEE_URL}${EndPoint}`, data, AXIOS_CONFIG_FORM(''))
        const res = await axios.post(`${MODAL_BASEE_URL}${EndPoint}`, data, AXIOS_CONFIG_FORM(''))
        console.log(`response ${EndPoint}`, res)
        return true
        if (res.status == 200) {
            // return { check: true, code: 200, data: res?.data }
        }
    }
    catch (err) {
        console.log(`Error ${EndPoint}`, err, err.response)
        return false
        // if (err.response.status == 400 || err.response.status == 401) {
        //     // showToast(err.response.data.message, 'error')
        //     return false
        // }
    }
}