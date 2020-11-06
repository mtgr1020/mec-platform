import { defineComponent, h, inject, onUpdated, ref } from "@vue/runtime-core";
export default defineComponent({
  name: "EasyDrop",
  props: {
    subClass: String,
  },
  setup() {
    // 注入拖拽节点的获取
    const slotEls = ref([])
    const dragEl = inject('dragEl')

    const handleDropEvent = (event) => {
      event.preventDefault() // 避免浏览器对数据的默认处理
      slotEls.value.push(dragEl[0].default) // 如果直接获取dragEl会导致全员地址指向唯一
    };

    const handleDargOverEvent = (event) => {
      event.preventDefault() // 必须设置此属性,才可以触发Drop 默认无法放置到其他元素
    }

    const handleDragElMove = (index) => {
      slotEls.value.splice(index, 1)
    }

    onUpdated(() => {
      const props = dragEl[0].default()[0].props
      if (props && props.renderRely) {
        props.renderRely(props.ref)
      }

    })

    return {
      slotEls,
      handleDropEvent,
      handleDargOverEvent,
      handleDragElMove

    };
  },
  render(ctx) {
    const createSlotComponent = () => {
      return ctx.slotEls.map((slotDefault, index) => {
        return h("div", {
          class: ctx.subClass,
          onDblClick: () => { ctx.handleDragElMove(index) }
        }, slotDefault())
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