export const download = (jsonName) => {
    return new Promise((resolve, reject) => {
        let json = require(`../../library/data/${jsonName}`),
            tHeader = []
        if (!json.dataRules) {
            reject('模版配置错误')
            return
        }

        json.dataRules.forEach((item) => {
            if (item.name) {
                tHeader.push(item.name)
            } else {
                reject('模版配置错误[name]')
                return
            }
        })
        require.ensure([], () => {
            const {export_json_to_excel} = require('../../excel/Export2Excel')
            const list = []
            const data = formatJson(tHeader, list)
            export_json_to_excel(tHeader, data, `小熊省钱大师海报模版【${json.tempName}】`)
        })
    })

}

export const formatJson = (filterVal, jsonData) => {
    return jsonData.map(v => filterVal.map(j => v[j]))
}

/**
 * 根据模版导入数据
 * @param file
 * @param jsonName
 * @returns {Promise<any>}
 * @constructor
 */
export function Import (file, jsonName) {
    return new Promise((resolve, reject) => {
        let json = require(`../../library/data/${jsonName}`)
        if (!json.dataRules) {
            reject('模版配置错误')
            return
        }

        let rABS = false //是否将文件读取为二进制字符串
        let f = file
        let reader = new FileReader()
        FileReader.prototype.readAsBinaryString = function (f) {
            let binary = '';
            let rABS = false
            let wb
            let outdata
            let reader = new FileReader()
            reader.onload = function (e) {
                let bytes = new Uint8Array(reader.result)
                let length = bytes.byteLength
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                let XLSX = require('xlsx')
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                        type: 'base64'
                    })
                } else {
                    wb = XLSX.read(binary, {
                        type: 'binary'
                    })
                }
                outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                this.da = [...outdata]
                let arr = []
                this.da.map(v => {
                    let obj = []
                    json.dataRules.forEach((item, index) => {
                        if (v.hasOwnProperty(item.name)) {
                            obj[index] = v[item.name]
                        } else {
                            reject('上传的文件格式错误，请按照要求编辑再上传')
                            return false
                        }
                    })
                    arr.push(obj)
                })
                resolve(arr)
            }
            reader.readAsArrayBuffer(f)
        }
        if (rABS) {
            reader.readAsArrayBuffer(f)
        } else {
            reader.readAsBinaryString(f)
        }
    })
}
