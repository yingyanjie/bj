import Vue from 'vue'
import App from './App'
import request from './utils/request.js'

Vue.config.productionTip = false
Vue.prototype.$request = request;
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
const app = new Vue({
    ...App
})
app.$mount()
