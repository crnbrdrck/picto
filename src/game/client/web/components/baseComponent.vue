<template>
  <main>
    <noscript>
      <section>Your browser has not enabled JavaScript, please enable it to play.</section>
    </noscript>

    <section id="message-box"></section>

    <section id="divider">
      <button>Send</button>
      <button>Clear</button>
    </section>

    <canvas id="picto-canvas">
      <strong>Your browser does not support HTML5 Canvas</strong>
      <a href="https://caniuse.com/canvas">Click here to view a list of browsers which support the canvas element</a>
    </canvas>
  </main>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue'

  export default Vue.extend({
    name:"base-component",

    data() {
      return { }
    },

    components: {

    }
  })
</script>

<style scoped>
  .section
  {
    background-color: red
  }
</style>
