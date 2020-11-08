import { defineComponent, h, inject, nextTick, ref } from "@vue/runtime-core";
export default defineComponent({
  name: "EasyDrop",
  props: {
    subClass: String,
  },
  setup() {
    // 注入拖拽节点的获取
    const reateUId = () => {
      return 'UId-' + (Math.random() * 10000 | 0)
    }
    const slotEls = ref([])
    const dragEl = inject('dragEl')

    const handleDropEvent = (event) => {
      event.preventDefault() // 避免浏览器对数据的默认处理
      slotEls.value.push({
        uid: reateUId(),
        def: dragEl[0].default
      }) // 如果直接获取dragEl会导致全员地址指向唯一
    };

    const handleDargOverEvent = (event) => {
      event.preventDefault() // 必须设置此属性,才可以触发Drop 默认无法放置到其他元素
    }

    const handleDragElMove = (index) => {
      /**
       * 删除为啥不能直接 slotEls.splice(index, 1)
       * 这种会导致有依赖mounted后的渲染组件无法正常显示,待研究
       */
      const _slotEls = [].concat(slotEls.value)
      slotEls.value = []
      nextTick(() => {
        _slotEls.splice(index, 1)
        slotEls.value = _slotEls
      })
    }

    return {
      slotEls,
      handleDropEvent,
      handleDargOverEvent,
      handleDragElMove,

    };
  },
  render(ctx) {
    const createSlotComponent = () => {
      return ctx.slotEls.map((slotEl, index) => {
        return h("div", {
          class: ctx.subClass,
          key: slotEl.reateUId,
          onDblClick: () => { ctx.handleDragElMove(index) },
          onVnodeMounted() {
            const props = slotEl.def()[0] && slotEl.def()[0].props
            if (props && props.renderRely) {
              props.renderRely(props.ref)
            }
          }
        }, slotEl.def())
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