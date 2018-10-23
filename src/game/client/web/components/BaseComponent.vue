<template>
  <section>
    Hello World!
  </section>
</template>

<script lang="ts">
  import Vue, {VueConstructor} from 'vue';

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
    background-color: red;
  }
</style>
