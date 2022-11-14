
// loading
import { createApp, h, resolveComponent, createVNode } from 'vue'
import { Spin } from 'application-theme-plus'

export const vSpin = {
  created: function(el, vNode) {
    // 创建对应的 spin loading
    const box = document.createElement('div')
    box.id = 'spinLoading'
    box.style.cssText = `background: rgba(240,242,245,.6);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;`
    const app = createApp({
      render: () => h(resolveComponent('spin'))
    })
    app.use(Spin)
    const instance = app.mount(document.createElement('div'))
    box.appendChild(instance.$el)
    el.appendChild(box)
  },
  updated: function(el, binding) {
    const spinDom = document.querySelector('#spinLoading')
    spinDom.style.display = binding.value ? 'flex' : 'none'
  }
}