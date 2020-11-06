<template>
  <div class="drag-container">
    <EasyDrop class="drop-wrap"></EasyDrop>
    <div class="drag-list-wrap">
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
    </div>
  </div>
</template>

<script>
import EasyDrag from "../../components/EasyDrag";
import EasyDrop from "../../components/EasyDrop";
export default {
  data() {
    return {
      dragList: [1, 2],
      dargElement: [],
      independent: 0,
    };
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
  },
  components: {
    EasyDrag,
    EasyDrop,
  },
};
</script>

<style lang="less" scoped>
.drag-container {
  height: 100%;
  display: flex;
  .drop-wrap {
    flex-grow: 1;
  }
  .drag-list-wrap {
    flex-basis: 200px;
    display: flex;
    flex-wrap: wrap;
    .drag-list-item {
      width: 100%;
      min-height: 100px;
      background-color: palevioletred;
      margin-bottom: 10px;
    }
  }
}
</style>