
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
  },

  /**
   * 判断访问终端及浏览器版本信息
   */
  browserInfo:() => {
    const u = navigator.userAgent;
    const res={
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //在 ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //在android终端
      iPhone: u.indexOf('iPhone') > -1|| u.indexOf('Mac') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      // @ts-ignore
      qq: u.match(/\sQQ/i) == " qq", //是否QQ
      language:navigator.language.toLowerCase(),
      RN:false,
    }
    console.log('browserVersion res=',res)
    const isIOS=res.ios||res.iPhone||res.iPad
    return {...res,isIOS};
  }

}
