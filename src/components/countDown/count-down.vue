<template>
    <view class="content">
        <button class="content-one" @click="nanLeToBJ">南乐至北京</button>
        <button class="content-two" @click="benJingToNL">北京至南乐</button>
    </view>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        nanLeToBJ() {
            this.$emit("nanLeToBJ")
        },
        benJingToNL() {
            this.$emit("benJingToNL")
        }
    }
}
</script>
<style lang="scss" scoped>
    .content {
        display: flex;
        justify-content: space-between;
        &-one,&-two {
            flex: 1;
            height: 80rpx;
            line-height: 80rpx;
            border-bottom: 1rpx solid gray;
            border-top: 1rpx solid gray;
            text-align: center;
        }
        &-one {
            border-right: 1rpx solid gray;
        }
    }
</style>