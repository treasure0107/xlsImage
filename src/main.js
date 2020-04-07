// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import common from './library/common'
import Monitor from './library/Monitor'

//excel
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'

import Helpers from 'muse-ui/lib/Helpers'
import Toast from 'muse-ui-toast'
import { Snackbar, Button, Icon } from 'muse-ui'

Vue.use(Helpers)
Vue.use(Toast)
Vue.use(Snackbar)
Vue.use(Button)
Vue.use(Icon)

Vue.prototype.$common = common
Vue.prototype.$Monitor = Monitor
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
