import ClientApi from "./ClientApi";
const makeApiCall = async (url, method, data = null, config = {}) => {
    console.log("url",url);
    
    const header = config.headers || {}
    if (data instanceof FormData) {
        header['Content-Type'] = 'multipart/form-data'
    }
    try {
        const response = await ClientApi({
            url,
            method,
            data,
            headers: header,
            ...config
        })
        return response.data
    }
    catch (error) {
        console.log(error);
        console.error(`Error during API call to ${url}:`, error.response?.status, error.response?.data?.message || error.message);
        throw error.response?.data || error.message; // Return detailed error
    }
}

export default makeApiCall;