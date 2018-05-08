<template lang="pug">
  #global-wrapper
    #header-wrapper
      textarea(@change="updateUsernames" @input="updateUsernames")
      #usernames
        .username(v-for="username in usernames") {{username}}
    #content-wrapper
      app-user(v-for="username, i in usernames" :username="username")
</template>

<script>
export default {
  data(){
    return {
      usernames: []
    };
  },
  methods: {
    updateUsernames(event){
      this.usernames = event.target.value.split(/[\ \,\|\n]{1,}/gmi);
    }
  }
};
</script>
