
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
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信,只要在手机微信浏览器里打开的h5页面,都是true （2015-01-22新增）
      // @ts-ignore
      qq: u.match(/\sQQ/i) == " qq", //是否QQ
      language:navigator.language.toLowerCase(),
      RN:false,
    }
    const plat = navigator.platform;
    const win = plat.indexOf("Win") == 0;
    const mac = plat.indexOf("Mac") == 0;
    const isPc=win || mac
    console.log('browserVersion res=',res)
    const isIOS=res.ios||res.iPhone||res.iPad
    return {...res,isIOS,isPc};
  },
  /**
   * 页面滚回顶部
   * IOS有效,安卓页面加载会自动置顶
   */
  goToTop:() => {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
    console.log('goToTop scrollTop=', scrollTop)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },

  /**
   * https://blog.csdn.net/weixin_41815063/article/details/119783330
   * 是否禁止页面滚动, 比 @touchmove.prevent 好, 因为 @touchmove.prevent 会导致页面里的弹框内容也无法滚动
   * .stop-scroll {
        left    : 0;
        position: fixed;
        top     : 0;
        height  : 100%;
        overflow: hidden;
        width   : 100%;
      }  声明在项目的根样式文件里
   * @param newValue
   */
   isStopPageScroll: (newValue:boolean) =>{
    console.log('starkfrontendtools  isStopPageScroll newValue=', newValue)
    newValue
        ? document.getElementsByTagName('body')[0].classList.add('stop-scroll')
        : document
            .getElementsByTagName('body')[0]
            .classList.remove('stop-scroll');
  },

  /**
   * 禁止被手势缩放 https://blog.csdn.net/rxh13543515695/article/details/119798451
   */
  noGestures:() => {
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        console.log('App.vue touchstart')
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function(event) {
        console.log('App.vue gesturestart')
        event.preventDefault()
      })
    }
  }

}
