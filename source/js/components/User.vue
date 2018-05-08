<template lang="pug">
  .user-wrapper
    p {{username}}
    div(v-if="loading") loading
    div(v-else)
      div(v-if="error") Has error
      div(v-else)
        app-tweet(v-for="tweet in user.tweets" :tweet="tweet")
</template>

<script>
const twitter = require('../twitter');
let cancel = null;

export default {
  props: {
    username: String
  },
  data(){
    return {
      loading: false,
      error: false,
      user: {}
    };
  },
  watch: {
    username(to, from){
      this.load();
    }
  },
  methods: {
    load(){
      if(cancel){
        cancel();
        cancel = null;
      }
      this.user = {};
      this.loading = true;
      this.error = false;
      twitter(this.username, c => cancel = c)
      .then(user => {
        this.user = user;
        this.error = false;
      })
      .catch((err => {
        this.error = !!cancel;
      }))
      .finally(() => {
        this.loading = false;
        cancel = null;
      });
    }
  },
  mounted(){
    this.load();
  }
};
</script>

<style>

</style>
