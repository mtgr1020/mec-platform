import { useRequest } from "@/utils/request";
import { checkAuthentication } from "@/config/dataSource";

/**
 * 全局路由守卫鉴权函数
 * 用户是否登录
 */
const canUserAccess = async (to, next) => {
    // TODO如何能解决白屏问题呢 ssr? 缓存到client?
    if (to.name === 'login' || sessionStorage.getItem('isLogin')) {
        return next()
    }
    const { request } = useRequest(checkAuthentication)
    let { isAuthenticated } = await request()
    if (!isAuthenticated) {
        next({
            name: 'login'
        })
    } else {
        next()
    }
}


export {
    canUserAccess
}