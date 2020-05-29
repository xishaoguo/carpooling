import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        openId: "",
        avatarUrl: ""
    },
    mutations: {
        getOpenId(state) {
            try {
                const value = uni.getStorageSync("openId");
                if (value) {
                    state.openId = value;
                    return value;
                }
            } catch (e) {
                // error
            }
        },
        getAvatarUrl(state) {
            try {
                const value = uni.getStorageSync("avatarUrl");
                if (value) {
                    state.avatarUrl = value;
                    return value;
                }
            } catch (e) {
                // error
            }
        }
    },
    actions: {
        setOpenId(state, openId) {
            uni.setStorage({
                key: 'openId',
                data: openId,
                success: function () {
                    console.log('success');
                }
            });
        },
        setAvatarUrl(state,avatarUrl) {
            uni.setStorage({
                key: 'avatarUrl',
                data: avatarUrl,
                success: function () {
                    console.log('success');
                }
            });
        }
    }
})
export default store