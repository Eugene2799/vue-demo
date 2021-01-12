<template>
  <div class="home">
    <nav-bar-title :leftArrow="true" :newRightMethod='true' title="会议签到" :rightText="'确定'" @clickRight="signConfirm()"></nav-bar-title>
    <van-cell-group>
        <van-field
            v-model="carNumber"
            required
            label="车牌号码"
            placeholder="请输入车牌号码"
        />
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <span class="title" slot="title">签到板</span>
        <div class="y-line" slot="icon"></div>
      </van-cell>
    </van-cell-group>
    <div class="signing-box" @click="showSignCanvas=true" style="position:relative;">
        <img class="view-image" :src="imageValue" width="100%" height="150">
        <div class="signing-text" style="position: absolute;">点击手写签名</div>
    </div>
    <div :class="showSignCanvas?'canvas-box':'hide-loading'">
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="imageValue"/>
        <div style="width:100%;">
            <van-button class="btn-box" @click="reSigning()" type="info">重写</van-button>
            <van-button class="btn-box" @click="confirm()" type="info">确定</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Collapse, CollapseItem, Button, Field, Toast } from "vant";
import { TSBBData } from "@/utils/Api.js";
import NavBarTitle from "@/components/NavBarTitle.vue";
import SignCanvas from 'sign-canvas';

export default {
  name: "Home",
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Toast.name]: Toast,
    NavBarTitle,
    SignCanvas
  },
  computed: {
    currentAssetsSorted() {
      return this.sortByZCFZ_XH(this.currentAssets)
    },
    currentLiabilitySorted() {
      return this.sortByZCFZ_XH(this.currentLiability)
    }
  },
  data() {
    return {
      data: [],
      showSignCanvas: false,
      carNumber: '',
      imageValue: null,
      currentAssets: [],
      nonCurrentAsset: [],
      currentLiability:[],
      nonCurrentLiability:[],
      others: [],
      activeNames1: ["1"],
      activeNames2: ["1"],
      activeNames3: ["1"],
      activeNames4: ["1"],
      options:{
            isDpr: true,       //是否使用dpr兼容高倍屏 [Boolean] 可选
            lastWriteSpeed: 1,  //书写速度 [Number] 可选
            lastWriteWidth: 2,  //下笔的宽度 [Number] 可选
            lineCap: 'round',   //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
            lineJoin: 'bevel',  //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
            isShowBorder: false, //是否显示边框 [可选]
            bgColor: '#fcc', //背景色 [String] 可选
            borderWidth: 1, // 网格线宽度  [Number] 可选
            borderColor: "#ff787f", //网格颜色  [String] 可选
            writeWidth: 5, //基础轨迹宽度  [Number] 可选
            maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
            minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
            writeColor: '#101010', // 轨迹颜色  [String] 可选
            isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
            imgType:'png'   //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
        }
    };
  },
  methods: {
    /**
     * 清除画板
     */
    canvasClear(){
        this.$refs.SignCanvas.canvasClear();
    },

    /**
     * 保存图片
     */
    saveAsImg(){
        const img = this.$refs.SignCanvas.saveAsImg();
        // alert(`image 的base64：${img}`);
    },

    /**
     * 下载图片
     */
    downloadSignImg(){
        this.$refs.SignCanvas.downloadSignImg();
    },
    confirm(){
        this.saveAsImg()
        this.showSignCanvas = false;
    },
    reSigning(){
        this.canvasClear()
    },
    async initData() {
      this.data = await TSBBData.get();
      this.dataBypass()
    },
    sortByZCFZ_XH(array){
      return array.sort(function(a,b){
        let x=a["ZCFZ_XH"];
        let y=b["ZCFZ_XH"];
        return ((x<y)?-1:((x>y)?1:0));
      });
    },
    dataBypass(){
      let currentAssets=[];
      let currentLiability=[];
      this.data.forEach(item => {
        if(item.ZCFZ_XM1 !== null){
          currentAssets.push(item)
        }
        if(item.ZCFZ_XM2 !== null){
          currentLiability.push(item)
        }
      });
      this.currentAssets = currentAssets;
      this.currentLiability = currentLiability;
    },
    signConfirm(){
        if(this.imageValue !== null){
            console.log(this.imageValue)
            Toast('签到成功！');
            this.$router.go(-1);
        }else{
            return Toast('请点击签名！');
        }
    }
  },
};
</script>
<style scoped>
    .signing-box{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .signing-text{
        position: absolute;
        top: 0;
        font-size: 2em;
        height: 100%;
        align-items: center;
        display: flex;
        color: blue;
        opacity: .2;
    }
    .canvas-box{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 10000;
        right: 0;
    }
    .btn-box{
        margin: 10px 5%;
        width: 40%;
    }
</style>