import Vue from 'vue';
import VueRouter from 'vue-router';
import sessionStore from "../store/index";
import common from "@/resource/common";
Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            name:'login',
            component: () => import('../components/login')
        },
        {
            path: '/index',
            name:'index',
            component: () => import('../components/index')
        }
    ]
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
let oneRun = true; //通过oneRun变量控制 避免陷入死循环
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        let loginUser = sessionStore.state.loginUser.loginUser;
        if (loginUser == undefined ) {
            next('/login');
        } else {
            if(from.name === null && oneRun){
                oneRun = false;
                common.addRoutes(router,sessionStore.state.menuTree.menuTree)
                next({...to, replace: true})
            }else{
                next();
            }
        }


    }
});

export default router;