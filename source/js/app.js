const Vue = require('vue').default;

Vue.component('app-user', require('./components/User.vue').default);
Vue.component('app-tweet', require('./components/Tweet.vue').default);

new Vue({
  el: "#app",
  render: h => h(require('./components/App.vue').default)
});
