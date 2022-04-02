/**
 * 获取vue的路由页面参数 | Get route page parameters of Vue
 * @param $route
 * @param queryKey : 要找的参数的key | Key of the parameter to be found
 */
const queryPageParam= ($route:{query: {}},queryKey:string='')=> {
    console.log('vueTools.ts queryPageParam $route=,', $route)
    console.log('vueTools.ts queryPageParam queryKey=,', queryKey)
    let res=null

    const {query}=$route
    if (query) {
        // @ts-ignore
        res=query[queryKey]
    }
    if (!res) {
        const urlParams = new URLSearchParams(window.location.search)
        console.log('vueTools.ts queryPageParam urlParams=', urlParams.toString())
        res = urlParams.get(queryKey)
    }
    console.log('vueTools.ts queryPageParam res=,', res)
    return res
}

export default {
    queryPageParam
}
