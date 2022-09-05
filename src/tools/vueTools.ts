import {cloneDeep} from 'lodash'


/**
 * 获取vue2的路由页面参数 | Get route page parameters of Vue
 * @param $route
 * @param queryKey : 要找的参数的key | Key of the parameter to be found
 */
const queryPageParam = ($route: { query: {} }, queryKey: string = '') => {
    console.log('vueTools.ts queryPageParam $route=,', $route)
    console.log('vueTools.ts queryPageParam queryKey=,', queryKey)
    let res = null

    const {query} = $route
    if (query) {
        // @ts-ignore
        res = query[queryKey]
    }
    if (!res) {
        const urlParams = new URLSearchParams(window.location.search)
        console.log('vueTools.ts queryPageParam urlParams=', urlParams.toString())
        res = urlParams.get(queryKey)
    }
    console.log('vueTools.ts queryPageParam res=,', res)
    return res
}

/**
 * 获取vue3路由(页面参数)里query参数
 */
const getVue3RouteQuery = (router: any) => {
    console.log('vueTools.ts getVue3RouteQuery router=', router)
    const {currentRoute} = router
    const {query} = currentRoute.value
    return cloneDeep(query)
}

/**

 * vue3 重定向
 * @param router
 * @param path 路径
 */
const redirectTo = (router: any, path: string) => {
    console.log('vueTools.ts redirectTo router=', router)
    console.log('vueTools.ts redirectTo path=', path)
    const {replace} = router
    replace({
        path,
    })
}

export default {
    queryPageParam, getVue3RouteQuery,redirectTo
}
