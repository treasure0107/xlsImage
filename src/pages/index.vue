<template>
  <div class="index-content">
    <div class="work-content" id="work-content">
      <canvas id="tutorial"></canvas>
    </div>
  </div>
</template>
<script>
    import * as PIXI from 'pixi.js'

    var app = null

    export default {
        data () {
            return {}
        },
        mounted () {
            !app && this.initCanvas()
        },
        methods: {
            initCanvas () {
                app = new PIXI.Application({
                    width: 376,
                    height: 667,
                    backgroundColor: 0x1099bb,
                    view: document.getElementById('tutorial'),
                    transparent: false //背景是否设为透明
                })
                document.getElementById('work-content').appendChild(app.view)
                let circle = new PIXI.Graphics()
                circle.beginFill(0x9966FF)
                circle.drawCircle(0, 0, 32)
                circle.endFill()
                circle.x = 64
                circle.y = 130
                app.stage.addChild(circle)

                PIXI.loader
                    .add('/static/images/imgs.jpg')
                    .load(setup)

                //This `setup` function will run when the image has loaded
                function setup () {
                    //Create the cat sprite
                    let cat = new PIXI.Sprite(PIXI.loader.resources['/static/images/imgs.jpg'].texture)
                    cat.width = 300
                    cat.height = 300
                    cat.buttonMode = true
                    cat.interactive = true
                    cat.on('pointerdown', onDragDown)
                        .on('pointerup', onDragEnd)
                        .on('pointermove', onDragMove)
                        .on('click', onClick)
                    app.stage.addChild(cat)

                    let dragging = false,
                        data = null,
                        dragPoint = null

                    function onDragDown (event) {
                        dragging = true
                        data = event.data
                        dragPoint = event.data.getLocalPosition(this.parent)
                        dragPoint.x -= this.x
                        dragPoint.y -= this.y
                    }

                    function onDragMove () {
                        if (dragging) {
                            //获取鼠标移动的位置
                            let newPosition = data.getLocalPosition(this.parent)
                            cat.x = newPosition.x - dragPoint.x
                            cat.y = newPosition.y - dragPoint.y
                        }
                    }

                    function onDragEnd () {
                        dragging = false
                        console.log('松开')
                    }

                    function onClick (event) {
                        let params = {
                            w: this.width,
                            h: this.height,
                            x: this.x,
                            y: this.y
                        }
                        console.log(params)
                    }

                    /*app.ticker.add(delta => gameLoop(delta))
                    var w = false
                    var h = false
                    function gameLoop (delta) {
                        //Move the cat 1 pixel
                        cat.x <= 0 && (w = false)
                        cat.x >= 309 && (w = true)
                        cat.y <= 0 && (h = false)
                        cat.y >= 600 && (h = true)
                        if (w) {
                            cat.x -= 1
                        } else {
                            cat.x += 1
                        }
                        if (h) {
                            cat.y -= 1
                        } else {
                            cat.y += 1
                        }
                    }*/
                }

            }
        }
    }
    /*var bunny = PIXI.Sprite.fromImage('./img/bunny.png')
    bunny.anchor.set(0.5) //设置原点位置
    //显示精灵X轴位置
    bunny.x = app.renderer.width / 2
    //显示精灵Y轴位置
    bunny.y = app.renderer.height / 2
    //将显示精灵添加进舞台
    app.stage.addChild(bunny)
    //每次渲染的监听函数
    app.ticker.add(function (delta) {
        bunny.rotation += 0.1
    })*/
</script>
<style lang="less" scoped>
  .index-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .work-content {
      max-width: 100%;
      max-height: 100%;
      width: 376px;
      height: 667px;
    }
  }
</style>