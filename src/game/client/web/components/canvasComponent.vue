<template>
    <canvas id="picto-canvas">
      <strong>Your browser does not support HTML5 Canvas</strong>
      <a href="https://caniuse.com/canvas">Click here to view a list of browsers which support the canvas element</a>
    </canvas>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue'

  export default Vue.component('canvas-component', {
    data() {
      return {}
    },

    components: {},

    methods: {
      getImage: function() {
        // Returns the image from the canvas and clears it (will be used for sending the message)
        const canvas = this.$el
        const data = this.$el.toDataURL()  // Returns data url for png image
        this.clear()
        return data
      },

      clear: function() {
        // Send an event from the canvas to make the other canvas code clear it's data
        const ev = new Event('clear-canvas')
        this.$el.dispatchEvent(ev)
      }
    }
  })
</script>
