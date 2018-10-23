<template>
  <main>
    <noscript>
      <section>Your browser has not enabled JavaScript, please enable it to play.</section>
    </noscript>

    <section id="message-box">
      <message-component v-for="msg in messages" v-bind:user="msg.username" v-bind:type="msg.type" v-bind:time="msg.time" v-bind:image="msg.image"></message-component>
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
  import { MessageType } from '../../../shared/net/messageType'

  export default Vue.component('base-component', {
    components: {
      CanvasComponent,
      MessageComponent,
    },

    created() {
      // When the component is created, prompt the user for a username
      let username : string | null = ''
      while (username === null || username === '') {
        username = prompt('Please enter a username!')
      }
      // Send a connect message via the client
      this.messages.push({type: MessageType.Connect, username})
      // Save the username
      this.username = username
    },

    data() {
      return {
        messages: [],
        username: ''
      }
    },

    methods: {
      // Have to use function since arrow functions will break the `this` context /shrug
      sendMessage: function() {
        // Use the canvas' message send method to get the data
        const image = this.$refs.canvas.getImage()
        this.messages.push({type: MessageType.SendPictoToClient, username: this.username, time: new Date(), image})
      },

      clearCanvas: function() {
        this.$refs.canvas.clear()
      }
    },

    props: ['client'],

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
