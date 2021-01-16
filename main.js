import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 导入网络请求的方法
import request from './utils/request.js'
Vue.prototype.$axios = request
// 引入外部图标
import './style/iconfont/iconfont.css'
// import './static/css/iconfont.css';
// 设置项目类型是app
App.mpType = 'app'

// 创建一个项目实例

const app = new Vue({
    ...App    // 将App组件渲染到Vue实例中   
})
app.$mount()  // 将vue实例挂载到页面中
