<template>
  <div class="index-content">
    <div id="tutorial" :style="`width:${work.width}px;height:${work.height}px`">
      <template v-if="contain.text">
        <div :class="item.class" v-for="item in contain.text"
             :style="`width:${item.width}px;height:${item.height}px;color:${item.color};left:${item.left}px;top:${item.top}px;font-size:${item.size}px;font-weight:${item.weight};text-align:${item.align}`">
          {{item.value}}
        </div>
      </template>
      <template v-if="contain.img">
        <img :src="item.url" alt="" :width="item.width" :height="item.height"
             :style="`left:${item.left}px;top:${item.top}px;border-radius:${item.radius}px`"
             v-for="item in contain.img">
      </template>
      <template v-if="contain.qr">
        <div v-for="(item,index) in contain.qr" :id="`qr_code${index}`"
             :style="`width:${item.width}px;height:${item.height}px;left:${item.left}px;top:${item.top}px;`"></div>
      </template>
    </div>
  </div>
</template>
<script>
    import QRCode from 'qrcodejs2'
    import html2canvas from 'html2canvas'
    import DownLoad from '../library/Image/download'
    //import canvasData from '../library/Image/data1'
    let list = [] //要生成图片的数据列表

    export default {
        data () {
            return {
                work: {},
                contain: {},
                index: 0,
                download: false,
                canvasData: null
            }
        },
        created () {
            this.canvasData = require('../library/data/data3')
            this.initTemp()
        },
        async mounted () {
            this.$Monitor.addEventListener('onTempDataIndex', index => {
                let data = this.$Monitor.tempImportData[index],
                    rule = this.canvasData.dataRules
                data.forEach((item, index) => {
                    let now = rule[index]
                    this.setCanvasData(now.obj, now.index, now.key, now.prefix + '' + item)
                })
                this.initData()
            })
            this.$Monitor.addEventListener('onTempImportData', data => {
                list = data
            })
            //订阅下载操作
            this.$Monitor.addEventListener('downloadImg', data => {
                this.download = true
                this.checkList()
            })

            let _this = this
            this.$Monitor.addEventListener('onTemplate', data => {
                let obj = require(`../library/data/${data}`)
                _this.$Monitor.setTempImportDate([])
                _this.$set(_this, 'canvasData', obj)
                this.initTemp()
            })

        },
        methods: {
            initTemp () {
                this.work = this.canvasData.work
                this.checkList()
            },

            /**
             * 初始化数据
             */
            checkList () {
                if (list[this.index]) {
                    let rule = this.canvasData.dataRules,
                        data = list[this.index]
                    data.forEach((item, index) => {
                        let now = rule[index]
                        this.setCanvasData(now.obj, now.index, now.key, now.prefix + '' + item)
                    })
                    this.initData()
                } else {
                    this.download = false
                    this.index === 0 && this.initData()
                }
            },

            /**
             * 设置json 数据
             * @param obj
             * @param index
             * @param key
             * @param value
             */
            setCanvasData (obj, index, key, value) {
                if (!this.canvasData[obj]) {
                    console.log('对象不存在')
                } else if (!this.canvasData[obj][index]) {
                    console.log('对象下标不存在')
                } else if (this.canvasData[obj][index][key]) {
                    this.canvasData[obj][index][key] = value
                } else
                    console.log('数据键值找不到')
            },

            /**
             * 读取json数据并写入vue变量
             */
            initData () {
                let arr = this.canvasData.contain
                arr.forEach((key, index) => {
                    this.$set(this.contain, key, this.canvasData[key])
                })
                this.$nextTick(function () {
                    this.contain.qr && this.newQrCode()
                })
            },

            /**
             * 渲染二维码
             * @returns {Promise<void>}
             */
            async newQrCode () {
                let run = ((res) => {
                    return new Promise((resolve, reject) => {
                        this.contain.qr.forEach((item, index) => {
                            document.getElementById(`qr_code${index}`).innerHTML = ''
                            let qrcode = new QRCode(`qr_code${index}`, item)
                        })
                        resolve(true)
                    })
                })
                await run()
                if (this.download) {
                    await this.setCanvas()
                    await this.$common.wait(800)
                    this.index += 1
                }
            },

            /**
             * 下载图片
             */
            setCanvas () {
                return new Promise((resolve, reject) => {
                    let shareContent = document.querySelector('#tutorial'),
                        width = shareContent.offsetWidth,
                        height = shareContent.offsetHeight,
                        canvas = document.createElement('canvas'),
                        scale = 2,
                        _this = this
                    canvas.width = width * scale
                    canvas.height = height * scale
                    canvas.getContext('2d').scale(scale, scale)
                    let opts = {
                        scale: scale,
                        canvas: canvas,
                        logging: true,
                        width: width,
                        height: height,
                        useCORS: true,
                    }

                    html2canvas(shareContent, opts).then(async function (canvas) {
                        let type = 'jpg'
                        let imgData = canvas.toDataURL(type)
                        await DownLoad.init(imgData, type, _this.index)
                        resolve(true)
                    })
                })

            }
        },

        watch: {
            index (val) {
                this.checkList()
            }
        },

        components: {
            QRCode
        }
    }
</script>
<style lang="less" scoped>
  .index-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #tutorial {
      background: #ffffff;
      position: relative;
      > div {
        position: absolute;
      }
      > img {
        position: absolute;
      }
      .work-text {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .work-text-left {
        display: flex;
        align-items: center;
      }
      .work-text-hide {
        overflow: hidden;
      }
      .coupon {
        background: #ffb932;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px 0 0 3px;
      }
      .coupon-2 {
        border: 1px #8559c8 solid;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: none;
      }
      .coupon-text-2 {
        background: #8541cc;
        line-height: 19px;
      }
      .coupon-text {
        border: 1px #ffb932 solid;
        line-height: 30px;
        font-weight: 600;
        border-radius: 0 3px 3px 0;
      }
    }
  }

  .price_zk {
    text-decoration: line-through;
  }

  .data3-goods-text {
    overflow: hidden;
  }
</style>