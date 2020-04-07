export default {
    contain: ['img', 'text', 'qr'],

    dataRules: [
        {obj: 'qr', index: 0, key: 'text', prefix: '', name: '二维码跳转链接'},
        {obj: 'text', index: 4, key: 'value', prefix: '', name: '商品昵称'},
        {obj: 'img', index: 0, key: 'url', prefix: '', name: '商品图片'},
        {obj: 'text', index: 3, key: 'value', prefix: '原价：¥', name: '原价'},
        {obj: 'text', index: 2, key: 'value', prefix: '', name: '优惠价'},
        {obj: 'text', index: 6, key: 'value', prefix: '', name: '优惠值'}
    ],

    work: {
        width: 376,
        height: 667
    },
    img: [
        {
            url: '/static/images/img2.jpg',
            width: 376,
            height: 376,
            top: 40,
            left: 0
        },
        {
            url: '/static/images/taobao.png',
            width: 376,
            height: 47,
            top: 620,
            left: 0
        }
    ],
    text: [
        {
            value: '左右滑动查看更多',
            width: 376,
            height: 40,
            color: '#333333',
            top: 0,
            left: 0,
            size: 14,
            weight: 'initial',
            class: 'work-text',
            align: 'center',
        },
        {
            value: '限时特价：¥',
            width: 90,
            height: 40,
            color: '#f05054',
            top: 418,
            left: 7,
            size: 15,
            weight: '500',
            class: 'work-text',
            align: 'left',
        },
        {
            value: '9.90',
            width: 120,
            height: 40,
            color: '#f05054',
            top: 418,
            left: 100,
            size: 28,
            weight: '500',
            class: 'work-text-left',
            align: 'left',
        },
        {
            value: '原价：¥130.00',
            width: 200,
            height: 20,
            color: '#adadad',
            top: 458,
            left: 9,
            size: 14,
            align: 'left',
            weight: '500',
            class: ''
        },
        {
            value: '成人幼儿童舞蹈鞋软底帆布练功鞋芭蕾舞女童跳舞鞋形体瑜伽猫爪,蕾舞女童跳舞鞋形体瑜伽猫爪',
            width: 230,
            height: 45,
            color: '#333333',
            top: 488,
            left: 9,
            size: 15,
            align: 'left',
            weight: '500',
            class: 'work-text-hide'
        },
        {
            value: '卷',
            width: 40,
            height: 30,
            color: '#ffffff',
            top: 560,
            left: 9,
            size: 17,
            align: 'left',
            weight: '500',
            class: 'coupon'
        },
        {
            value: '10元',
            width: 60,
            height: 30,
            color: '#ffb932',
            top: 560,
            left: 43,
            size: 16,
            align: 'center',
            weight: '500',
            class: 'coupon-text'
        },
        {
            value: '分享来自【小熊省钱大师】',
            width: 170,
            height: 30,
            color: '#cccccc',
            top: 565,
            left: 190,
            size: 13,
            align: 'center',
            weight: '500',
            class: ''
        }
    ],
    qr: [
        {
            text: 'https://m.adooe.com/web/goodsinfo?id=277',
            width: 110,  // 设置宽度
            height: 110, // 设置高度
            top: 426,
            left: 255
        },
    ],
    setData (obj, index, key, value) {
        if (!this[obj]) {
            console.log('对象不存在')
        } else if (!this[obj][index]) {
            console.log('对象下标不存在')
        } else if (this[obj][index][key]) {
            this[obj][index][key] = value
        } else
            console.log('数据键值找不到')
    }
}
