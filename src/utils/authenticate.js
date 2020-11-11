import { useRequest } from "@/utils/request";
import { checkAuthentication } from "@/config/dataSource";

/**
 * 全局路由守卫鉴权函数
 * 用户是否登录
 */
const canUserAccess = async (to, next) => {
    let isAuthenticated = false
    const { request } = useRequest(checkAuthentication)
    await request()
    if (to.name !== 'login' && !isAuthenticated) {
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