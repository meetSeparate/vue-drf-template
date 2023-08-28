<script setup>
import intro from 'intro.js'
import "intro.js/minified/introjs.min.css";
import {ref, watch, onMounted, computed} from 'vue'
import axios from "axios";
import moment from "moment";

defineOptions({
  name: "Guide"
})
const guide = () => {
  intro()
      .setOptions({
        steps: [
          {
            element: document.querySelector("#header-notice"),
            title: "消息通知",
            intro: "您可以在这里查看管理员发送的消息",
            position: "left"
          },
          {
            element: document.querySelector("#header-translation"),
            title: "国际化",
            intro: "您可以在这里进行语言切换",
            position: "left"
          },
          {
            element: document.querySelector("#set-icon"),
            title: "项目配置",
            intro: "您可以在这里查看项目配置",
            position: "left"
          },
          {
            element: document.querySelector("#tags-view"),
            title: "多标签页",
            intro: "这里是您访问过的页面的历史",
            position: "bottom"
          }
        ]
      })
      .start();
}
const loading = ref(false)
const value = ref('A6386')
const options = ref([])
// 城市对象
const cityObj = computed(() => {
  console.log(options.value)
  const length = options.value? options.value.length : 0
  return length===0 ? {} : options.value.find(item => item.id===value.value)
})
// 获取城市列表
const getCityList = async (location) => {
  const res = await axios.get('https://geoapi.qweather.com/v2/city/lookup', {params: {
      location: location,
      key: '49830178f7374988a42d5c4612b1bd80',
      lang: 'en',
      number: 5
    }})
  options.value = res.data?.location
}
// 远程搜索
const remoteMethod = async (location) => {
  if (location) {
    loading.value = true
    await getCityList(location)
    loading.value = false
  }
}
// 实时天气信息
const nowWeather = ref({})
// 发送获取天气的函数
const getWeather = async () => {
  const res = await axios.get('https://devapi.qweather.com/v7/weather/now', {
    params: {
      location: value.value,
      key: '49830178f7374988a42d5c4612b1bd80',
      lang: 'en'
    }
  })
  nowWeather.value = res.data?res.data.now:{}
}
// 监听选中城市变化
watch(value, () => {
  getWeather()
})
onMounted(() => {
  getWeather()
  getCityList('london')
})
</script>

<template>
  <div class="padding">
    <el-card>
      <template #header>
        <div class="card-header">
        <span class="font-medium">
          引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能
        </span>
        </div>
      </template>
      <el-button type="primary" class="mt-[10px]" @click="guide">
        打开引导页
      </el-button>
    </el-card>
    <el-select
        style="margin-top: 30px"
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
    >
      <el-option
          v-for="item in options"
          :key="item?.id"
          :label="item?.name"
          :value="item?.id"
      />
    </el-select>
    <div class="card" style="margin-top: 10px">
      <div class="container">
        <div class="cloud front">
          <span class="left-front"></span>
          <span class="right-front"></span>
        </div>
        <span class="sun sunshine"></span>
        <span class="sun"></span>
        <div class="cloud back">
          <span class="left-back"></span>
          <span class="right-back"></span>
        </div>
      </div>

      <div class="card-header">
        <span>{{cityObj?.name}}<br>{{cityObj?.country}}</span>
        <span>{{moment(nowWeather.obsTime).format('MM-DD-YYYY')}}</span>
      </div>

      <span class="temp">{{nowWeather.temp}}°</span>

      <div class="wind">
        <span>Wind Dir: {{nowWeather.windDir}}</span>
      </div>

      <div class="temp-scale">
        <span>Weather: {{nowWeather.text}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.padding{
  padding: 20px;
}
.card {
  width: 450px;
  height: 235px;
  position: relative;
  padding: 25px;
  background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #FFFFFF;
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}

.container {
  width: 250px;
  height: 250px;
  position: absolute;
  right: -35px;
  top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
}

.cloud {
  width: 250px;
}

.front {
  padding-top: 45px;
  margin-left: 25px;
  display: inline;
  position: absolute;
  z-index: 11;
  animation: clouds 8s infinite;
  animation-timing-function: ease-in-out;
}

.back {
  margin-top: -30px;
  margin-left: 150px;
  z-index: 12;
  animation: clouds 12s infinite;
  animation-timing-function: ease-in-out;
}

.right-front {
  width: 45px;
  height: 45px;
  border-radius: 50% 50% 50% 0%;
  background-color: #4c9beb;
  display: inline-block;
  margin-left: -25px;
  z-index: 5;
}

.left-front {
  width: 65px;
  height: 65px;
  border-radius: 50% 50% 0% 50%;
  background-color: #4c9beb;
  display: inline-block;
  z-index: 5;
}

.right-back {
  width: 50px;
  height: 50px;
  border-radius: 50% 50% 50% 0%;
  background-color: #4c9beb;
  display: inline-block;
  margin-left: -20px;
  z-index: 5;
}

.left-back {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 0% 50%;
  background-color: #4c9beb;
  display: inline-block;
  z-index: 5;
}

.sun {
  width: 120px;
  height: 120px;
  background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
  background: linear-gradient(to right, #fcbb04, #fffc00);
  border-radius: 60px;
  display: inline;
  position: absolute;
}

.sunshine {
  animation: sunshines 2s infinite;
}

@keyframes sunshines {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes clouds {
  0% {
    transform: translateX(15px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(15px);
  }
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-header span:first-child {
  word-break: break-all;
  font-weight: 800;
  font-size: 15px;
  line-height: 135%;
  color: rgba(87, 77, 51, 0.66);
}

.card-header span:last-child {
  font-weight: 700;
  font-size: 15px;
  line-height: 135%;
  color: rgba(87, 77, 51, 0.33);
}

.temp {
  position: absolute;
  left: 25px;
  bottom: 12px;
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  color: rgba(87, 77, 51, 1);
}

.temp-scale {
  position: absolute;
  right: 5%;
  bottom: 25px;
}

.temp-scale span {
  font-weight: 700;
  font-size: 16px;
  line-height: 134.49%;
  color: rgba(87, 77, 51, 0.66);
}
.wind {
  position: absolute;
  bottom: 25px;
  right: 40%;

  span {
    font-weight: 700;
    font-size: 16px;
    line-height: 134.49%;
    color: rgba(87, 77, 51, 0.66);
  }
}
</style>
