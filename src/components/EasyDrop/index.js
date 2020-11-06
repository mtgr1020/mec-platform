import { defineComponent, h, inject, ref } from "@vue/runtime-core";
export default defineComponent({
  name: "EasyDrop",
  setup() {
    // 注入拖拽节点的获取
    const slotEls = ref([])

    const dragEl = inject('dragEl')
    const handleDropEvent = (event) => {
      event.preventDefault() // 避免浏览器对数据的默认处理
      slotEls.value.push(dragEl)
    };

    const handleDargOverEvent = (event) => {
      event.preventDefault() // 必须设置此属性,才可以触发Drop 默认无法放置到其他元素
    }

    return {
      handleDropEvent,
      handleDargOverEvent,
      slotEls
    };
  },
  render(ctx) {
    const createSlotComponent = () => {
      return ctx.slotEls.map(slotEl => {
        console.log(slotEl)
        return h("div", {}, slotEl[0].default())
      })
    }

    return h("div",
      {
        ondrop: ctx.handleDropEvent,
        onDragOver: ctx.handleDargOverEvent,
      },
      [...createSlotComponent()]
    );
  },
});