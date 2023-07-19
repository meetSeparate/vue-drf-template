<template>
  <div class="silder-range" :class="rangeStatus?'success':''">
<!--    <i @mousedown="rangeMove" :class="rangeStatus?successIcon:startIcon"></i>-->
    <el-icon @mousedown="rangeMove" ref="slider">
      <ArrowRightBold v-show="!rangeStatus" />
      <Select v-show="rangeStatus" />
    </el-icon>
    {{rangeStatus?successText:startText}}
  </div>
</template>
<script>
export default {
  props: {
    //成功图标
    successIcon: {
      type: String,
      default: "Select"
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功"
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "ArrowRightBold"
    },
    //开始的文字
    startText: {
      type: String,
      default: "拖动滑块到最右侧"
    }
  },
  name: "SilderVerify",
  data() {
    return {
      rangeStatus:'',

    };
  },
  methods: {
    rangeMove(e){
      let ele

      if (e.target.className === 'el-icon') {
        ele = e.target;
      }
      else if (e.target.parentElement.className === 'el-icon') {
        ele = e.target.parentElement;
      }
      else {
        ele = e.target.parentElement.parentElement;
      }
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth =  ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if(this.rangeStatus){//不运行
        return false;
      }
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if(this.disX<=0){
          this.disX = 0;
        }
        if(this.disX>=MaxX-eleWidth){//减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = '.1s all';
        ele.style.transform = 'translateX('+this.disX+'px)';
        e.preventDefault();
      }
      document.onmouseup = ()=> {
        if(this.disX !== MaxX){
          ele.style.transition = '.5s all';
          ele.style.transform = 'translateX(0)';

          this.$emit("failed", this.rangeStatus);

        }else{
          this.rangeStatus = true;

          this.$emit("success", this.rangeStatus);

        }
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

  }
};
</script>
<style scoped lang="scss">
.dark {
  .silder-range {
    background-color: #222426;
    color: #fff;

    .el-icon {
      background-color: #c3d2fb;
      color: #fff;
    }
  }
}


.silder-range{
  background-color: #e3e4e6;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px; /*no*/
  width: 100%;
}
.silder-range .el-icon{
  position: absolute;
  left: 0;
  width: 60px;/*no*/
  height: 100%;
  color: #919191;
  background-color: #fff;
  border: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.silder-range.success{
  background-color: #7AC23C;
  color: #fff;
}
.silder-range.success .el-icon{
  color: #7AC23C;
}
</style>

