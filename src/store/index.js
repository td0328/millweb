import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate"
const sessionStore = new Vuex.Store( {
    state: {
        loginUser: {},
        menuTree:{menuTree:[]}
    },
    getters:{

    },
    mutations: {
        setLoginUser(state, loginUser){//定义的修改 属性的方
            state.loginUser.loginUser = loginUser
        },
        setMenuTree(state, menuTree){//定义的修改 属性的方
            state.menuTree.menuTree = menuTree
        }
    },
    actions: {},
    plugins: [createPersistedState({
        storage:window.sessionStorage
    })]
})
export default sessionStore;