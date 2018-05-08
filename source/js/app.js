const Vue = require('vue').default;

Vue.component('app-user', require('./components/User.vue').default);

new Vue({
  el: "#app",
  render: h => h(require('./components/App.vue').default)
});
