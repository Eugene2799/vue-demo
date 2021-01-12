<template>
  <div class="home">
    <nav-bar-title title="移动会议"></nav-bar-title>
    <van-cell-group>
      <van-cell>
        <span class="title" slot="title">会议内容</span>
        <div class="y-line" slot="icon"></div>
      </van-cell>
    </van-cell-group>
    <vue-plyr ref="plyr">
      <video
        controls
        crossorigin
        playsinline
        data-poster="../assets/videobg.jpg"
      >
        <source
          size="720"
          src="../assets/cctv.mp4"
          type="video/mp4"
        />
      </video>
    </vue-plyr>
    <!-- <vue-plyr ref="plyr">
      <div class="plyr__video-embed">
        <iframe
          src="https://player.vimeo.com/video/143418951?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr> -->
    <div style="margin-top: 20%;text-align: center;">
      <van-button @click="goSigning()" style="width: 75%;" type="info">会议签到</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Collapse, CollapseItem, Button, Toast } from "vant";
import { TSBBData } from "@/utils/Api.js";
import NavBarTitle from "@/components/NavBarTitle.vue";

export default {
  name: "Home",
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Toast.name]: Toast,
    NavBarTitle
  },
  computed: {
    currentAssetsSorted() {
      return this.sortByZCFZ_XH(this.currentAssets)
    },
    currentLiabilitySorted() {
      return this.sortByZCFZ_XH(this.currentLiability)
    }
  },
  mounted () {
    this.$refs.plyr.player.on('event', () => console.log('event fired'))
  },
  data() {
    return {
      data: [],
      currentAssets: [],
      nonCurrentAsset: [],
      currentLiability:[],
      nonCurrentLiability:[],
      others: [],
      activeNames1: ["1"],
      activeNames2: ["1"],
      activeNames3: ["1"],
      activeNames4: ["1"],
    };
  },
  methods: {
    goSigning(){
      this.$router.push({path: "/signing"});
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
    }
  },
};
</script>
