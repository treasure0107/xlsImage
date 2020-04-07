export default {
    wait (time) {
        return new Promise((resolve, reject) => {
            setTimeout(res => {
                resolve(true)
            }, time || 1000)
        })
    }
}