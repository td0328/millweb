const routers = [
    {
        path: '/tableconfig',
        name: 'tableconfig',
        component: () => import('./custom/tableconfig.vue')
    },
    {
        path: '/menuconfig',
        name: 'menuconfig',
        component: () => import('./custom/menuconfig.vue')
    }
]
export default routers