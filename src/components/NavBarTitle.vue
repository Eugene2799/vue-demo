<template>
    <van-nav-bar
            :left-text="leftText"
            :left-arrow="leftArrow"
            :zIndex="zIndex"
            class="title"
            @click-left="newLeftMethod?leftMethod():onClickLeft()"
            @click-right="newRightMethod?rightMethod():onClickRight()"
    >
        <div style="color: white;" slot="title">{{title}}</div>
        <template slot="right">
            <span style="color: white;">{{rightText}}</span>
            <van-icon v-if="rightArrow" :name="iconName" size="20"/>
        </template>
    </van-nav-bar>
</template>

<script>
    import {NavBar, Icon} from "vant";

    export default {
        name: 'TitleBanner',
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon
        },
        props: {
            rightText: {
                type: String,
                default: ''
            },
            title: String,
            leftText: {
                type: String,
                default: '返回'
            },
            iconName: {
                type: String,
                default: 'wap-home'
            },
            zIndex: {
                type: Number,
                default: 1222
            },
            newRightMethod: {
                type: Boolean,
                default: false
            },
            newLeftMethod: {
                type: Boolean,
                default: false
            },
            leftArrow: {
                type: Boolean,
                default: false
            },
            rightArrow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                this.$router.push({path: "/home"});
            },
            leftMethod() {
                this.$emit("clickLeft");
            },
            rightMethod() {
                this.$emit("clickRight");
            }
        }
    }
</script>

<style scoped lang="scss">
    .title {
        height: 50px;
        background-image: linear-gradient(to right, #0385F8, #1Ab7BA);
        .van-nav-bar__title {
            position: relative;
            top: 3px;
        }
    }
</style>
