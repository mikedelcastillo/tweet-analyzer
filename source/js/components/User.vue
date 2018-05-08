<template lang="pug">
  .user-wrapper
    p {{username}}
    div(v-if="loading") loading
    div(v-else)
      div(v-if="error") Has error
      div(v-else)
        p {{user}}
        p {{loading}}
        p {{error}}
</template>

<script>
const twitter = require('../twitter');
let request = null;

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
    username(){
      this.load();
    }
  },
  methods: {
    load(){
      this.loading = true;
      this.error = false;
      if(request) twitter.cancel();
      request = twitter(this.username)
      .then(user => {
        this.user = user;
      })
      .catch((err => {
        this.error = true;
      }))
      .finally(() => {
        this.loading = false;
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
