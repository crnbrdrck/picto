<template>
  <div class="message">
    <p>Sent by {{ user }} @ {{ time }}</p>
    <img :src="image" />
  </div>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue'

  export default Vue.component('message-component', {
    data() {
      return {}
    },

    props: ['user', 'time', 'image'],

    components: {}
  })
</script>
