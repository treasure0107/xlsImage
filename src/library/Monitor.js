import index from '../router'

class Monitor {
    template = ''
    tempImportData = []
    Hooks = []
    tempDataIndex = -1
    nowTemp = ''

    constructor () {
        console.log('开启监发布者')
    }

    setTemplate (name) {
        this.template = name
        this.tempImportData = []
        this.dispatchEvent('onTemplate', name)
        //发布变化通知
    }

    setTempImportDate (data) {
        this.tempImportData = data
        this.dispatchEvent('onTempImportData', data)
        //发布变化通知
    }

    setTempDataIndex (index) {
        this.tempDataIndex = index
        this.dispatchEvent('onTempDataIndex', index)
    }

    downloadImg () {
        this.dispatchEvent('downloadImg')
    }

    /**
     * 订阅
     * @param type
     * @param fn
     */
    addEventListener (type, fn) {
        !this.Hooks[type] && (this.Hooks[type] = [])
        this.Hooks[type].push(fn)
    }

    /**
     * 定义发布规则
     * @param type
     * @param message
     */
    dispatchEvent (type, message) {
        if (this.Hooks[type]) {
            for (let hook of this.Hooks[type]) {
                hook.call(this, message)
            }
        }
    }
}

export default new Monitor()