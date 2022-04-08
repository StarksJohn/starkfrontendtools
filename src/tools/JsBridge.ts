import tool from './tool'

/**
 *  * https://juejin.cn/post/6885988193402159118#heading-9
 * 通用的 H5 调app 方法
 * @param functionName: app原生的方法名
 * @param data: 要调的app原生方法的参数
 * @param callback
 * 坑: iframe 方式,用xcoce+模拟器 自测无效
 */
// export function callClient (functionName, data, callback) {
//   // 避免连续调用
//   // if (JsBridge.lastCallTime && (Date.now() - JsBridge.lastCallTime) < 100) {
//   //   setTimeout(() => {
//   //     this.callClient(functionName, data, callback)
//   //   }, 100)
//   //   return
//   // }
//   // JsBridge.lastCallTime = Date.now()
//
//   data = data || {}
//   // if (callback) {
//   //   const cbName = 'randomName';
//   //   Object.assign(data, { cbName });
//   //   window.jsClientCallBack[cbName] = callBack.bind(this);
//   // }
//
//   if (tool.browserInfo().isIOS) {//
//     // data.forEach((key, value) => {
//     //   try {
//     //     data[key] = JSON.stringify(value)
//     //   } catch (e) { }
//     // })
//     const url = 'jsbridge://' + functionName + '?' + JSON.stringify(data)
//     const iframe = document.createElement('iframe')
//     iframe.style.width = '1px'
//     iframe.style.height = '1px'
//     iframe.style.display = 'none'
//     iframe.src = url
//     document.body.appendChild(iframe)
//     setTimeout(() => {
//       iframe.remove()
//     }, 100)
//   } else if (tool.browserInfo().android) {    //  这里安卓客户端使用的是上面说的第二种通信方法
//     window.AndroidNativeApi &&
//     window.AndroidNativeApi[functionName] &&
//     window.AndroidNativeApi[functionName](JSON.stringify(data))
//   } else if (tool.browserInfo().RN) {     //rn的<webView>组件可以设置props.userAgent来让H5识别
//     window.postMessage(
//       JSON.stringify(data)
//     )
//
//   } else {
//     console.error('未获取platform信息，调取api失败')
//   }
// }

/**
 * H5 与原生app 通信
 *    https://cloud.tencent.com/developer/article/1840143
 *    https://cloud.tencent.com/developer/article/1777681
 *    https://www.jianshu.com/p/6ec9571a0105
 * @FUNCTION nativeFuncName : 被调用的 原生方法名
 * @desc 本地调试的时候可以关闭当前代码的调用 因为本地的时候是没有该方法的，浏览器会直接报错！
 * eg:
 * import { jsBridge } from 'starkfrontendtools'
 * jsBridge.appBridge({window:window,nativeFuncName:'share', param:{aa:'22'}})

 */
export function appBridge({ window={},nativeFuncName='',param={} }) {
  if (tool.browserInfo().isIOS){
    console.log('appBridge ios nativeFuncName=',nativeFuncName,' param=',param)
    try {
      // @ts-ignore
      window.ios[nativeFuncName](JSON.stringify(param));//IOS 8 之后才能用
    } catch (error) {
      console.log('appBridge iOS error=',error)
      try{//兼容ios8前的调用
        // @ts-ignore
        window.webkit.messageHandlers[nativeFuncName].postMessage(JSON.stringify(param));
      }catch(e){
        console.log("appBridge iOS can not find Function of IOS e=" + e)
      }
    }
  }else if(tool.browserInfo().android){
    // @ts-ignore
    window.AndroidWebView[nativeFuncName](JSON.stringify(param))

    // window.WebViewJavascriptBridge.send(data, function (responseData) {
    //   console.log('appBridge 请求结果：' + responseData)
    // })
  }

}
