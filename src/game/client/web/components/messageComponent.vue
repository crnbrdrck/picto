<template>
  <div v-if="type === this.types.SendPictoToClient" class="message">
    <p>Sent by {{ user }} @ {{ time }}</p>
    <img :src="image" />
  </div>
  <div v-else-if="type === this.types.Connect" class="message connect">
    <p><strong>{{ user }} has joined the chat room!</strong></p>
  </div>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue'
  import { MessageType } from '../../../shared/net/messageType'

  export default Vue.component('message-component', {
    data() {
      return {
        types: MessageType
      }
    },

    props: ['image', 'time', 'type', 'user'],

    components: {}
  })
</script>
