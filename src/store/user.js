const user = {
    state:{
        user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : ''
    },
    mutations:{
        //获取用户信息
        getUser(state, user){
            state.user = user
            this.commit('saveUser')
        },
        //退出登录
        logoutINn(state,user){
            state.user = user;
            this.commit('saveUser')
        },
        //保存用户信息在本地
        saveUser(state){
            sessionStorage.setItem('user', JSON.stringify(state));
        }
    },
    actions:{
        //saveUserInfo({ commit },data){
            //commit('USER_INFO',data)
        //}
    }
};
export default user