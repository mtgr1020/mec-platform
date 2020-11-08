<template>
  <div class="drag-container">
    <EasyDrop class="drop-wrap" :subClass="'drop-sub'"></EasyDrop>
    <div :class="['drag-list-wrap', isPackUp ? 'list-pack-up' : '']">
      <EasyDrag class="drag-list-item" v-for="item in dragList" :key="item">
        <div>
          {{ item }}
          <p>this is text</p>
        </div>
      </EasyDrag>
      <EasyDrag class="drag-list-item">
        <div>
          {{ independent }}
          <button @click="independent++">add</button>
        </div>
      </EasyDrag>
      <EasyDrag class="drag-list-item">
        <div
          style="width: 300px; height: 300px"
          ref="chart1"
          :renderRely="initMockCharts"
        ></div>
      </EasyDrag>
      <EasyDrag class="drag-list-item">
        <div
          style="width: 300px; height: 300px"
          ref="chart2"
          :renderRely="initMockCharts"
        ></div>
      </EasyDrag>
      <div
        :class="['drap-dent-common', isPackUp ? 'outdent' : 'indent']"
        @click="isPackUp = !isPackUp"
      ></div>
    </div>
  </div>
</template>

<script>
import EasyDrag from "../../components/EasyDrag";
import EasyDrop from "../../components/EasyDrop";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import { mockBarData } from "./mockChartOpt";

// 引入柱状图
export default {
  data() {
    return {
      dragList: [1, 2],
      dargElement: [],
      independent: 0,
      isPackUp: false, // 是否收起列表栏
    };
  },

  mounted() {
    this.initMockCharts("chart1");
    this.initMockCharts("chart2");
  },

  provide() {
    return {
      dragEl: this.dargElement,
      colletDargElement: this.handleColletDargElement,
    };
  },
  methods: {
    handleColletDargElement(slot) {
      this.dargElement.splice(0, 1, slot);
    },
    initMockCharts(key) {
      echarts.init(this.$refs[key]).setOption(mockBarData());
      setTimeout(this.initMockCharts.bind(this, key), 1000);
    },
  },
  components: {
    EasyDrag,
    EasyDrop,
  },
};
</script>

<style lang="less">
@space: 8px;
@drag-bg-color: rgba(24, 51, 92, 0.548);
.drag-container {
  height: 100%;
  display: flex;
  .drop-wrap {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    padding: @space;
    .drop-sub {
      flex-basis: 30%;
      background-color: @drag-bg-color;
      height: 300px;
      margin: @space;
    }
  }

  @basis-width: 300px;
  .drag-list-wrap {
    @backcolor: rgb(95, 204, 153);
    @min-height: 100px;

    flex-basis: @basis-width;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    padding: @space;
    background-color: @backcolor;
    .drag-list-item {
      width: 100%;
      min-height: @min-height;
      background-color: @drag-bg-color;
      margin-bottom: @space;
    }
    .drap-dent-common {
      @dent-size: 30px;
      position: absolute;
      left: -@dent-size;
      width: @dent-size;
      height: @dent-size;
      background-color: @backcolor;

      background-size: 100% 100%;
    }
    .indent {
      background-image: url("../../assets/img/indent.png");
    }

    .outdent {
      background-image: url("../../assets/img/outdent.png");
    }
  }
  .list-pack-up {
    transform: translateX(@basis-width);
  }
}
</style>