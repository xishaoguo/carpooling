class myUtils {
    constructor() {

    }

    getOpenId() {
        return uni.getStorageSync('openId');;
    }
}

module.exports = new myUtils();