import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL

export const fetchData = async (limit, page) => {
    try {
        const totalAlldata = await axios.get(`${API_URL}`)
        const response = await axios.get(`${API_URL}?limit=${limit}&page=${parseInt(page)}`)
        const hasMore = totalAlldata.data.length > response.data.length
        const data = {
            total: totalAlldata.data.length,
            page: page,
            data: response.data,
            hasMore
        }
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error)
    }
}