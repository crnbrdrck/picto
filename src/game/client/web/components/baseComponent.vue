<template>
  <main>
    <noscript>
      <section>Your browser has not enabled JavaScript, please enable it to play.</section>
    </noscript>

    <section id="message-box">
      <div v-for="msg in messages" class="message">
        <p>Sent by {{ msg.username }} @ {{ msg.time }}</p>
        <img :src="msg.image" />
      </div>
    </section>

    <section id="divider">
      <button id="send-btn">Send</button>
      <button id="clear-btn">Clear</button>
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
      return {
        messages: []
      }
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
