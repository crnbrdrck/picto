<template>
  <main>
    <noscript>
      <section>Your browser has not enabled JavaScript, please enable it to play.</section>
    </noscript>

    <section id="message-box">
      <message-component v-for="msg in messages" v-bind:user="msg.username" v-bind:time="msg.time" v-bind:image="msg.image"></message-component>
    </section>

    <section id="divider">
      <button v-on:click="sendMessage()">Send</button>
      <button v-on:click="clearCanvas()">Clear</button>
    </section>

    <canvas-component ref="canvas"></canvas-component>
  </main>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue'
  import CanvasComponent from './canvasComponent.vue'
  import MessageComponent from './messageComponent.vue'

  export default Vue.component('base-component', {
    components: {
      CanvasComponent,
      MessageComponent,
    },

    data() {
      return {
        messages: []
      }
    },

    methods: {
      // Have to use function since arrow functions will break the `this` context /shrug
      sendMessage: function() {
        // Use the canvas' message send method to get the data
        const image = this.$refs.canvas.getImage()
        this.messages.push({username: 'me', time: new Date(), image})
      },

      clearCanvas: function() {
        this.$refs.canvas.clear()
      }
    },

    updated: function() {
      // Method called whenever ths component is updated, use to scroll the chat to the bottom
      this.$nextTick(function() {
        const element = document.querySelector('#message-box')!
        element.scrollTop = element.scrollHeight
      })
    }
  })
</script>

<style scoped>
  .section
  {
    background-color: red
  }
</style>
