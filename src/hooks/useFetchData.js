import React, {useEffect, useState, useCallback} from "react";
import {get} from "../utils/fechRequest";

/**
 * 不使用reducer
 * @param url
 * @param initData
 * @returns {{fetchData: ((function(*): Promise<void>)|*), data: *[], onRefresh: ((function(): Promise<void>)|*), refreshing: boolean, onReload: ((function(*): Promise<void>)|*), loading: boolean, error: boolean}}
 */
const useFetchData = (url, initData) => {
    // 如果有传过来的initData，设置到initialState里
    initData = {
        data: initData || [],
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);

    /**
     * 读取接口
     * @try 读取成功后赋值并把url传给封装的get方法
     * @catch  失败后传出Error
     * @finally 无论成功失败都将loading取消
     * @param url
     * @returns {Promise<void>}
     */
    const fetchData = async (url,) => {
        try {
            const response = await get(url);
            setData(response);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    /**
     * 监听url，发生变化自动重新读接口
     */
    useEffect(() => {
        fetchData(url).then()
    }, []);

    /**
     * 下拉刷新
     * @type {(function(): Promise<void>)|*}
     */
    const onRefresh = useCallback(async (url) => {
        setRefreshing(true);
        await fetchData(url).then()
        setRefreshing(false);
    }, []);

    /**
     * 重新加载数据
     * @type {(function(*): Promise<void>)|*}
     */
    const onReload = useCallback(async (url) => {
        setLoading(true);
        await fetchData(url)
    }, []);

    return {loading, error, refreshing, data, onRefresh, onReload, fetchData,setData}
}

export default useFetchData
