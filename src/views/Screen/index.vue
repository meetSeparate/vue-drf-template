<template>
  <div class="dataScreen-container">
    <div ref="dataScreenRef" class="dataScreen">
      <div class="dataScreen-header">
        <div class="header-lf">
          <span class="header-screening" @click="router.push('/layout/home')">首页</span>
        </div>
        <div class="header-ct">
          <div class="header-ct-title">
            <span>智慧旅游可视化大数据展示平台</span>
            <div class="header-ct-warning">平台高峰预警信息（2条）</div>
          </div>
        </div>
        <div class="header-rg">
          <span class="header-download">统计报告</span>
          <span class="header-time">当前时间：{{ time }}</span>
        </div>
      </div>
      <div class="dataScreen-main">
        <div class="dataScreen-lf">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>实时游客统计</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <RealTimeAccessChart ref="RealTimeAccessRef" />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>男女比例</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <MaleFemaleRatioChart ref="MaleFemaleRatioRef" />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>年龄比例</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <AgeRatioChart ref="AgeRatioRef" />
            </div>
          </div>
        </div>
        <div class="dataScreen-ct">
          <div class="dataScreen-map">
            <div class="dataScreen-map-title">景区实时客流量</div>
            <!-- <vue3-seamless-scroll
							:list="alarmData"
							class="dataScreen-alarm"
							:step="0.5"
							:hover="true"
							:limitScrollNum="3"
						>
							<div class="dataScreen-alarm">
								<div class="map-item" v-for="item in alarmData" :key="item.id">
									<img src="./images/dataScreen-alarm.png" alt="" />
									<span class="map-alarm sle">{{ item.label }} 预警：{{ item.warnMsg }}</span>
								</div>
							</div>
						</vue3-seamless-scroll> -->
            <mapChart ref="MapChartRef" />
          </div>
          <div class="dataScreen-cb">
            <div class="dataScreen-main-title">
              <span>未来30天游客量趋势图</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <OverNext30Chart ref="OverNext30Ref" />
            </div>
          </div>
        </div>
        <div class="dataScreen-rg">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>热门景区排行</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <HotPlateChart ref="HotPlateRef" />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>年度游客量对比</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <AnnualUseChart ref="AnnualUseRef" />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>预约渠道数据统计</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <PlatformSourceChart ref="PlatformSourceRef" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import mapChart from "./components/chinaMapChart.vue";
import AgeRatioChart from "./components/AgeRatioChart.vue";
import AnnualUseChart from "./components/AnnualUseChart.vue";
import HotPlateChart from "./components/HotPlateChart.vue";
import MaleFemaleRatioChart from "./components/MaleFemaleRatioChart.vue";
import OverNext30Chart from "./components/OverNext30Chart.vue";
import PlatformSourceChart from "./components/PlatformSourceChart.vue";
import RealTimeAccessChart from "./components/RealTimeAccessChart.vue";

const router = useRouter();
const dataScreenRef = ref(null);

onMounted(() => {
  // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    dataScreenRef.value.style.width = `1920px`;
    dataScreenRef.value.style.height = `1080px`;
  }
  // 初始化 echarts
  initCharts();
  // 为浏览器绑定事件
  window.addEventListener("resize", resize);
});

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
};
// 随机数字
const  randomNum = (min, max) => {
  return Math.floor(Math.random() * (min - max) + max)
}
// 处理时间
const useTime = () => {
  const year = ref(0); // 年份
  const month = ref(0); // 月份
  const week = ref(""); // 星期几
  const day = ref(0); // 天数
  const hour = ref(0); // 小时
  const minute = ref(0); // 分钟
  const second = ref(0); // 秒
  const nowTime = ref(""); // 当前时间

  // 更新时间
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = "日一二三四五六".charAt(date.getDay());
    day.value = date.getDate();
    hour.value =
        (date.getHours() + "")?.padStart(2, "0") ||
        new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours())
    minute.value =
        (date.getMinutes() + "")?.padStart(2, "0") ||
        new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes())
    second.value =
        (date.getSeconds() + "")?.padStart(2, "0") ||
        new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getSeconds())
    nowTime.value = `${year.value}年${month.value}月${day.value} ${hour.value}:${minute.value}:${second.value}`
  }

  updateTime()

  return { year, month, day, hour, minute, second, week, nowTime }
}

// 监听浏览器 resize 事件
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
  }
  // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
  Object.values(dataScreen).forEach(chart => {
    chart && chart.resize();
  });
};

// 声明echarts实例
const dataScreen = {
  chart1: null,
  chart2: null,
  chart3: null,
  chart4: null,
  chart5: null,
  chart6: null,
  chart7: null,
  mapChart: null
};

const RealTimeAccessRef = ref()
const AgeRatioRef = ref()
const AnnualUseRef = ref()
const HotPlateRef = ref()
const MaleFemaleRatioRef = ref()
const OverNext30Ref = ref()
const PlatformSourceRef = ref()
const MapChartRef = ref()

// 初始化 charts参数
let ageData = [
  {
    value: 200,
    name: "10岁以下",
    percentage: "16%"
  },
  {
    value: 110,
    name: "10 - 18岁",
    percentage: "8%"
  },
  {
    value: 150,
    name: "18 - 30岁",
    percentage: "12%"
  },
  {
    value: 310,
    name: "30 - 40岁",
    percentage: "24%"
  },
  {
    value: 250,
    name: "40 - 60岁",
    percentage: "20%"
  },
  {
    value: 260,
    name: "60岁以上",
    percentage: "20%"
  }
];
let hotData = [
  {
    value: 79999,
    name: "峨眉山",
    percentage: "80%",
    maxValue: 100000
  },
  {
    value: 59999,
    name: "稻城亚丁",
    percentage: "60%",
    maxValue: 100000
  },
  {
    value: 49999,
    name: "九寨沟",
    percentage: "50%",
    maxValue: 100000
  },
  {
    value: 39999,
    name: "万里长城",
    percentage: "40%",
    maxValue: 100000
  },
  {
    value: 29999,
    name: "北京故宫",
    percentage: "30%",
    maxValue: 100000
  }
];
let platFromData = [
  {
    value: 40,
    name: "智慧文旅平台",
    percentage: "40%"
  },
  {
    value: 10,
    name: "携程",
    percentage: "10%"
  },
  {
    value: 20,
    name: "飞猪",
    percentage: "20%"
  },
  {
    value: 30,
    name: "其他渠道",
    percentage: "30%"
  }
];
let annualData = [
  {
    label: new Date().getFullYear() - 2 + "年",
    value: ["184", "90", "120", "0", "30", "100", "80", "40", "20", "510", "350", "180"]
  },
  {
    label: new Date().getFullYear() - 1 + "年",
    value: ["118", "509", "366", "162", "380", "123", "321", "158", "352", "474", "154", "22"]
  },
  {
    label: new Date().getFullYear() + "年",
    value: ["548", "259", "113", "90", "69", "512", "23", "49", "28", "420", "313", "156"]
  }
];
let mapData = [
  {
    fromName: "北京",
    toName: "上海",
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891]
    ]
  },
  {
    fromName: "上海",
    toName: "北京",
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "北京",
    toName: "广州",
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196]
    ]
  },
  {
    fromName: "广州",
    toName: "北京",
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "北京",
    toName: "成都",
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617]
    ]
  },
  {
    fromName: "成都",
    toName: "北京",
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: "成都",
    toName: "新疆维吾尔自治区",
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801]
    ]
  },
  {
    fromName: " 新疆维吾尔自治区",
    toName: "成都",
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617]
    ]
  }
];

// 初始化 echarts
const initCharts = () => {
  dataScreen.chart1 = RealTimeAccessRef.value?.initChart(0.5)
  dataScreen.chart2 = AgeRatioRef.value?.initChart(ageData)
  dataScreen.chart3 = AnnualUseRef.value?.initChart({
    data: annualData,
    unit: annualData.map(val => val.label),
    columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["#FFA600", "#007AFE", "#FF4B7A"]
  })
  dataScreen.chart4 = HotPlateRef.value?.initChart({
    data: hotData,
    colors: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
  })
  dataScreen.chart5 = MaleFemaleRatioRef.value?.initChart({
    man: 0.6,
    woman: 0.4
  })
  dataScreen.chart6 = OverNext30Ref.value?.initChart({
    unit: ["访问量"],
    data: new Array(30).fill("").map(val => {
      val = randomNum(1, 20000);
      return val
    })
  })
  dataScreen.chart7 = PlatformSourceRef.value?.initChart({
    data: platFromData,
    colors: ["#078dbc", "#6ad40b", "#6172fc", "#1786ff", "#ffbe2f", "#4dc89d", "#b797df", "#ffd3aa"]
  })
  dataScreen.mapChart = MapChartRef.value?.initChart(mapData)
};

// 获取当前时间
const { nowTime } = useTime();
let timer = null;
let time = ref(nowTime.value);
timer = setInterval(() => {
  time.value = useTime().nowTime.value;
}, 1000);

// 销毁时触发
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  clearInterval(timer)
  Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
