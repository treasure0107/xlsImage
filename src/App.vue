<template>
  <div id="app">
    <div class="top-header">
      <div class="header-logo">小熊省钱大师</div>
      <!-- <vue-tabs class="header-tabs">
         <vue-tab>TAB ITEM 1</vue-tab>
         <vue-tab>TAB ITEM 1</vue-tab>
         <vue-tab>TAB ITEM 1</vue-tab>
       </vue-tabs>-->

      <div class="download-img">
        <mu-button flat color="default" @click="downloadImg()">
          <mu-icon left value="cloud_download"></mu-icon>
          下载
        </mu-button>
      </div>
    </div>
    <div class="body-content">
      <div class="muse-left">
        <div class="muse-left-list">
          <mu-ripple class="muse-use" @click="active='win'" :class="active==='win' && 'act'" :opacity="0.3">
            <vue-icon size="22" value="tv"></vue-icon>
            窗口
          </mu-ripple>
          <mu-ripple class="muse-use" @click="active='upload'" :class="active==='upload' && 'act'" :opacity="0.3">
            <vue-icon size="22" value="undo"></vue-icon>
            导入
          </mu-ripple>
        </div>
        <div class="muse-left-cont">
          <div class="header-search">
            <text-field placeholder="search" action-icon="search"></text-field>
          </div>
          <carousel class="content-o" :active="carActive" :cycle="false" hide-indicators hide-controls>
            <carousel-item>
              <div class="content-p">
                <div class="item-content">
                  <mu-ripple class="temp-list" v-for="(item,index) in tempList" :key="index"
                             @click="template=item.value"
                             :class="template===item.value && 'now-temp'">
                    {{item.name}}
                  </mu-ripple>
                  <!--<div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>
                  <div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>
                  <div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>
                  <div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>
                  <div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>
                  <div class="item-list">
                    <vue-icon size="40" value="phone_iphone"></vue-icon>
                    <div class="sys-name">iphone6</div>
                    <div class="sys-w-h">376 x 667</div>
                  </div>-->
                </div>

                <div class="muse-list-line"></div>

                <div class="colors-title">自定宽高</div>
                <div class="custom-px">
                  <text-field placeholder="宽度" suffix="px" full-width></text-field>
                  <text-field placeholder="高度" suffix="px" full-width></text-field>
                </div>
              </div>
            </carousel-item>
            <carousel-item>
              <div class="content-p">
                <div class="upload-buts">
                  <vue-button @click="downloadTemp()" full-width round color="success">
                    <vue-icon left value="cloud_download"></vue-icon>
                    下载模版
                  </vue-button>
                  <input ref="excelFile" type="file" @change="exportExcel(this)"
                         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                  <vue-button @click="importClick()" full-width round color="primary">
                    <vue-icon left value="cloud_upload"></vue-icon>
                    上传数据
                  </vue-button>
                  <!--
                                    <vue-button full-width round color="secondary">
                                      <vue-icon left value="cloud_upload"></vue-icon>
                                      批量下载
                                    </vue-button>-->
                </div>
                <div class="muse-list-line"></div>
                <div class="colors-title">数据列表</div>
                <div class="upload-data-list">
                  <list>
                    <list-item @click="tempIndex=index" :ripple="true" button v-for="(item,index) in importData"
                               :key="index">
                      {{item[0]}}
                    </list-item>
                  </list>
                </div>
              </div>
            </carousel-item>
          </CAROUSEL>
        </DIV>
      </DIV>
      <div class="work-content">
        <router-view ref="routerObj"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
    import { Tabs, Tab } from 'muse-ui/lib/Tabs'
    import { Icon, Button, TextField } from 'muse-ui'
    import { Carousel, CarouselItem } from 'muse-ui/lib/Carousel'
    import { List, ListItem } from 'muse-ui/lib/List'
    import { Select, Option } from 'muse-ui/lib/Select'

    import { download, Import } from './library/excel/operation'

    export default {
        name: 'App',
        data () {
            return {
                active: 'win',
                carActive: 0,
                template: 'data3',
                importData: [],
                tempIndex: -1,
                tempList: [
                    {
                        name: '模版一',
                        value: 'data1'
                    },
                    {
                        name: '模版二',
                        value: 'data2'
                    },
                    {
                        name: '模版三',
                        value: 'data3'
                    }
                ]
            }
        },
        mounted () {
            this.$Monitor.setTemplate(this.template)
            this.$Monitor.addEventListener('onTempImportData', data => {
                this.importData = data
            })
        },
        methods: {
            async downloadTemp () {
                try {
                    download(this.template)
                } catch (e) {
                    this.$toast.warning({
                        message: e,
                        position: 'top'
                    })
                }

            },
            importClick () {
                this.$refs.excelFile.click()
            },

            async exportExcel () {
                let file = event.currentTarget.files[0]
                try {
                    let data = await Import(file, this.template)
                    this.$Monitor.setTempImportDate(data)
                    this.importData = data
                } catch (e) {
                    this.$toast.warning({
                        message: e,
                        position: 'top'
                    })
                }
            },
            downloadImg () {
                if (this.importData.length > 0) {
                    this.$Monitor.downloadImg()
                } else {
                    this.$toast.error({
                        message: '没有上传导入数据',
                        position: 'top'
                    })
                }
            }
        },
        watch: {
            active (val) {
                if (val === 'win') this.carActive = 0
                else if (val === 'upload') this.carActive = 1
            },
            tempIndex (val) {
                this.$Monitor.setTempDataIndex(val)
            },
            template (val) {
                console.log(val)
                this.$Monitor.setTemplate(val)
            }
        },
        components: {
            vueTabs: Tabs,
            vueTab: Tab,
            vueIcon: Icon,
            vueButton: Button,
            TextField,
            Carousel,
            CarouselItem,
            List,
            ListItem,
            vueSelect: Select,
            vueOption: Option
        }
    }
</script>

<style lang="less" scoped>
  @topHeight: 48px;
  @museLeftWidth: 366px;
  @museLeftList: 50px;
  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;
    .top-header {
      width: 100%;
      height: @topHeight;
      background: #3e97f7;
      .header-logo {
        width: 120px;
        float: left;
        background: #2196f3;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size: 16px;
        font-weight: 600;
        padding-left: 5px;
      }
      .header-tabs {
        float: left;
        width: calc(~"100% - 200px");
      }
      .download-img {
        float: right;
        width: 100px;
        height: 100%;
        background: #3e97f7;
        button {
          height: 100%;
          color: white;
        }
      }
    }
    .download-temp {
      float: right;
      width: 140px;
      height: 100%;
      background: #3e97f7;
      button {
        height: 100%;
        color: white;
      }
    }
    .body-content {
      width: 100%;
      height: calc(~"100vh -" @topHeight);
      .muse-left {
        width: @museLeftWidth;
        height: 100%;
        float: left;
        .muse-left-list {
          width: @museLeftList;
          height: 100%;
          float: left;
          background-color: #fff;
          overflow: visible;
          position: relative;
          z-index: 1002;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, .16);
          padding-top: 50px;
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #8f8f8f;
            padding: 5px 0;
            .mu-icon {
            }
            &:first-child {
              margin-top: 0;
            }
          }
          .muse-use {
            width: 100%;
            height: 70px;
            position: relative;
            i {
              margin-bottom: 3px;
            }
          }
          .act {
            background-color: #f7f7f7;
          }
        }
        .muse-left-cont {
          width: calc(~"100% - " @museLeftList);
          float: left;
          height: 100%;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, .16);
          background-color: #f7f7f7;
          transition: width .3s;
          .header-search {
            width: 280px;
            height: 40px;
            background: #fff;
            box-sizing: border-box;
            padding: 0 32px 0 12px;
            line-height: 1.4;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .08);
            border: none;
            font-size: 12px;
            margin-left: 18px;
            margin-top: 18px;
          }
          .content-o {
            width: 100%;
            margin-top: 20px;
            display: block;
            float: left;
            height: calc(~"100% - 78px");
            .content-p {
              width: 100%;
              height: 100%;
            }
            .item-content {
              width: 100%;
              float: left;
              .item-list {
                width: 81px;
                padding: 10px 3px;
                height: 105px;
                margin-top: 18px;
                margin-left: 18px;
                float: left;
                background: #fff;
                border-radius: 2px;
                box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
                .sys-name {
                  font-size: 13px;
                  font-weight: 500;
                  margin-top: 5px;
                }
                .sys-w-h {
                  font-size: 12px;
                  color: #666;
                  margin-top: 2px;
                }
              }
            }
            .temp-list {
              position: relative;
              width: 81px;
              padding: 10px 3px;
              height: 105px;
              margin-top: 18px;
              margin-left: 18px;
              float: left;
              background: #fff;
              border-radius: 2px;
              box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
              line-height: 88px;
            }
            .now-temp {
              background: #3e97f7;
              transition: all 0.5s;
              color: #ffffff;
            }
            .custom-px {
              width: 100%;
              float: left;
              padding: 18px;
              .mu-input {
                font-size: 13px;
              }
            }
          }
          .colors-title {
            margin: 10px 18px;
            line-height: 14px;
            font-size: 14px;
            color: #9b9b9b;
            width: calc(~"100% - 36px");
            text-align: left;
          }
          .upload-buts {
            width: calc(~"100% - 36px");
            height: 100px;
            margin: 20px 18px 0 18px;
            button {
              margin-top: 18px;
              &:first-child {
                margin-top: 0;
              }
            }
            input {
              display: none;
            }
          }
          .upload-data-list {
            width: calc(~"100% - 36px");
            height: 580px;
            margin: 0 18px;
            overflow-y: scroll;
            li {
              border-bottom: 1px rgba(0, 0, 0, .12) solid;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
            }
          }
        }
      }
      .work-content {
        width: calc(~"100vw - 390px");
        float: left;
        height: 100%;
      }
    }
    .muse-list-line {
      width: 280px;
      height: 1px;
      display: block;
      margin: 27px 18px;
      background: rgba(0, 0, 0, .12);
      float: left;
    }
  }

</style>
