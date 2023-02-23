import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../constants/Api';

const Request = async (url, method = "GET", params) => {
    const token = await AsyncStorage.getItem('token');
    /**
     * @newPromise 返回的是Promise，不是真正的值，真正的值要在then里面获取
     */
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(Api + url, {
                // 接口需要的参数
                method: method,
                headers: {
                    Accept: 'application/json',  //不是必带，根据接口来
                    'Content-Type': 'application/json',  //不是必带，根据接口来
                    token: token ? token : ""
                },
                /**
                 * 如果有参数就把转为json
                 */
                body: params ? JSON.stringify(params) : "",
            })
            console.log(312321, params)
            const responseJson = await response.json();
            resolve(responseJson.data);
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * 发送 get 请求
 * @param url
 * @returns {Promise<*>}
 */
const get = async (url) => {
    return await Request(url, "GET")
}

/**
 * 发送POST请求
 * @param url
 * @param params
 * @returns {Promise<*>}
 */
const post = async (url, params) => {
    return await Request(url, "POST", params)
}

export default Request
export {get, post}