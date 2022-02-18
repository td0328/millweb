

const common = {
    //动态加载路由
    addRoutes:(router,menus) =>{
        for (let i in menus){
            let submenu = menus[i].submenu;
            for (let j in submenu){
                router.addRoute('index',{
                    path:submenu[j].filename,
                    name:submenu[j].filename,
                    component: () => import('../'+submenu[j]['contents']+'/'+submenu[j]['filename']+'.vue')
                });
            }
        }
    }
}
export default common;