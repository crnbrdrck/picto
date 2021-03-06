import Vue from 'vue'
import BaseComponent from  './components/baseComponent.vue'

export class VueApp {
  private vue: Vue

  constructor() {
    this.vue = new Vue({
      el: '#app',
      template:
      `
        <base-component></base-component>
      `,
      components: {
        BaseComponent
      }
    })
  }
}
