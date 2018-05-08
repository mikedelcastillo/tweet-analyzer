<template lang="pug">
  .tweet
    .username @{{tweet.username}}
    .content(v-html="tweet.html")
</template>

<script>
export default {
  props: {
    tweet: Object
  },
  data(){
    return {};
  }
}
</script>

<style>

</style>
