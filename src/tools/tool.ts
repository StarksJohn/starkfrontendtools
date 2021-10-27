
export default {
  /**
   * https://www.cnblogs.com/chrissong/p/10841760.html
   * 避免 try catch  后去 err
   * @param promise
   * @returns {*|Promise<T | any[]>}
   */
  to: (promise: Promise<any>) => {
    return promise
      .then((res) => {
        return [null, res]
      })
      .catch((err) => {
        return [err]
      })
  },

  /**
   * 图片网络链接 ios补全 https，安卓可用http
   * @param imgUrl
   * @param p
   * @returns {*}
   */
  uri: (imgUrl:string = '', p:string = 'ios') => {
    // @ts-ignore
    if (p === 'ios' && imgUrl.startsWith('http:')) {
      imgUrl = imgUrl.replace(/http/, 'https')
    }
    return imgUrl
  },

  // 换算显示的 xxx 万
  tenThousandConversion: (n: number, unitStr: any /* 超过10000后最后显示的单位 */) => {
    if (n >= 10000) {
      n = Math.round((n / 10000) * 100) / 100
      n = n + unitStr
    }
    return n
  },

  /**
   *
   * @param old
   * @param now
   * @param keys :比较全部属性: Object.keys(old) 或  比较某个属性 :['memberList']
   * @returns {boolean}
   */
  shouldUpdate: (old: { [x: string]: any }, now: { [x: string]: any }, keys: { [x: string]: any }) => {
    const isEmpty = (object: object | null) => {
      if (object === null) {
        return true
      } else {
        switch (typeof object) {
          case 'undefined': {
            return true
          }
          case 'string': {
            return object === ''
          }
          case 'object': {
            // @ts-ignore
            for (const key in object) {
              return false
            }
            return true
          }
          default: {
            return false
          }
        }
      }
    }
    if (!isEmpty(keys)) {
      for (const i in keys) {
        const key = keys[i]
        const oldValue = old[key]
        const nowValue = now[key]
        if (typeof oldValue !== 'function' && typeof nowValue !== 'function') {
          try {
            if (JSON.stringify(oldValue) !== JSON.stringify(nowValue)) {
              return true
            }
          } catch (e) {}
        }
      }
    }
    return false
  }

}
