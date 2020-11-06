import { defineComponent, h, inject } from "@vue/runtime-core";

export default defineComponent({
  name: "EasyDrag",
  setup(props, { slots }) {
    // 注入组件节点收集方法
    const colletDargElement = inject('colletDargElement')

    const handleDragStartEvent = () => {
      colletDargElement(slots)
    }

    return {
      handleDragStartEvent
    }
  },
  render(ctx) {
    return h(
      "div",
      {
        draggable: true,
        onDragStart: ctx.handleDragStartEvent
      },
      ctx.$slots.default()
    );
  }
});