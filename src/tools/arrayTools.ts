/**
 * 返回 2个数组里相同的元素
 * @param array2
 * isSame : true: 返回相同的元素; false:返回不同元素
 * @returns {Array}
 */
function filterSameEle<T> (array1: any[], array2: any[]): Array<T> {
  // 临时数组存放
  const tempArray1 = []// 临时数组1
  const tempArray2 = []// 临时数组2
  for (let i = 0; i < array2.length; i++) {
    tempArray1[array2[i]] = true// 将数array2 中的元素值作为tempArray1 中的键，值为true；
  }
  for (let i = 0; i < array1.length; i++) {
    if (tempArray1[array1[i]]) {
      tempArray2.push(array1[i])// 过滤array1 中与array2 相同的元素；
    }
  }
  return tempArray2
}

/**
 * http://www.cnblogs.com/yeyuchangfeng/p/6237819.html
 * 数组是否包含某对象
 * @param v
 * @returns {*|Number|number}
 */
function isContainValue (v: any, array: any[]): boolean {
  for (const i in array) {
    // Log.log('i下标  ='+i + ' arr[i] '+this[i] );
    if (array[i] === v) {
      return true
    }
  }
  // Log.log('sf_isContainValue false  '+v);
  return false
}

/**
 * 返回 数组里 满足 predicateFunc 方法 筛选条件的 对象的 下标，满足后直接 自动 break
 * @param predicateFunc:
 *              eg: 返回 数组里 满足 id==0 的 对象 的 下标
 *                   (element)=>{
                        return element.id==0
                     }
 */
function findObjIndex<T> (predicateFunc: (value: T, index: number, obj: T[]) => unknown, array: T[]): number {
  return array.findIndex(predicateFunc)
}

/**
 * 根据 谓词 返回 满足条件的 数组元素，只返回 第一个满足条件的 数组元素，因 底层遍历数组应该是 正序
 * @param predicateFunc
 *                   (element)=>{
                        return element.id==0
                     }
 * @returns {number}
 */
function findObjWithPredicate<T> (predicateFunc: (value: T, index: number, obj: T[]) => unknown, array: T[]): any {
  const index = array.findIndex(
    predicateFunc
  )
  if (index !== -1) {
    return array[index]
  }
  return null
}

/**
 * js删除数组里的某个元素
 * http://caibaojian.com/js-splice-element.html
 * @param val
 * @param array
 * @returns {number}
 */
function remove (val: any, array: any[]) {
  const index = array.indexOf(val)
  if (index > -1) {
    array.splice(index, 1)
  }
}

/**
 * @param array
 * @param predicateFunc : (element)=>{
                        return element.id==0
                     }
 */
const removeObject = (array: any[], predicateFunc: (value: never, index: number, obj: never[]) => unknown) => {
  // @ts-ignore
  const index = array.findIndex(predicateFunc)
  if (index > -1) {
    array.splice(index, 1)
  }
}

/**
 * 返回 数组里 符合 predicateFunc 条件的 元素的 某个key 的 元素集合
 * @param arr
 * @param predicateFunc
 * @returns {*}
 */
const filterSameItem = <T>(arr: T[], predicateFunc: (value: T, index: number, obj: T[]) => unknown) => {
  return arr.map(
    (value, index, array) => {
      return predicateFunc(value, index, array)
    }
  )
}

/**
 * 用 一个对象的所有 values  初始化一个 新数组
 * @param obj
 * @returns {any[]}
 */
function initArrayByObjValues (obj: any): any[] {
  return Array.from(
    Object.values(obj)
  ).map(
    (val) => {
      return val
    }
  )
}

/**
 * http://www.jb51.net/article/67458.htm
 * 排序规则函数 类型
 * @type {{NumAscSort(*, *): number, NumDescSort(*, *): number}}
 */
export const sortType = {
  /**
     * http://www.jb51.net/article/67458.htm
     * 数组排序时提供的 排序规则函数，用于把数组元素 按照字符编码的顺序 升序排序，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b
     * @param a
     * @param b
     * @returns {number}
     * @constructor
     */
  NumAscSort (a: number, b: number) {
    return a - b
  },

  /**
     * http://www.jb51.net/article/67458.htm
     * 数组排序时提供的 排序规则函数，用于把数组元素 按照字符编码的顺序 降序排序，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b
     * @param a
     * @param b
     * @returns {number}
     * @constructor
     */
  NumDescSort (a: number, b: number) {
    return b - a
  }
}

/**
 * http://www.jb51.net/article/67458.htm
 * 对象数组的 排序 ,按 sortType 的 类型  进行 0  升序或 1 降序 排序
 * key1:每个数组元素都有的key，按这个key的值对数组元素进行 排序,如果key的 值是 number，则按 sortType的值对 number 进行排序
 * key2:每个数组元素都有的key，当key1相同时，用key2 排序。默认 传 ""
 */
function sortObjectArr (key1: string, key2: string = '', sortType = 0/* 外部不传此参数时，默认是0，升序排序 */) {
  // by函数接受一个成员名字符串和一个可选的次要比较函数做为参数并返回一个可以用来包含该成员的对象数组进行排序的比较函数，当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下
  const by = function (key1: string | number, key2: { (o: any, p: any): any; (arg0: any, arg1: any): any } | undefined) {
    return function (o: { [x: string]: any }, p: { [x: string]: any }) {
      let a, b
      if (o && p && typeof o === 'object' && typeof p === 'object') {
        a = o[key1]
        b = p[key1]
        if (a === b) {
          return typeof key2 === 'function' ? key2(o, p) : 0
        }
        if (typeof a === typeof b) {
          return sortType === 0 ? (a < b ? -1 : 1 /* 升序 */) : (a < b ? 1 : -1/* 降序 */)// ;
        }
        return sortType === 0 ? (typeof a < typeof b ? -1 : 1) : (typeof a < typeof b ? 1 : -1)
      } else {
        throw new Error('error')
      }
    }
  }

  // @ts-ignore
  this.sort(by(key1, by(key2)))
}

/**
 * 数组去重
 * http://blog.csdn.net/fungleo/article/details/54931379
 * @param array
 * @returns {*[]}
 */
function dedupe (array: any[]) {
  // @ts-ignore
  return [...new Set(array)]
}

/**
 *  扩展运算符实现数组的 深拷贝
 * https://www.cnblogs.com/lvonve/p/11334628.html
 * @param obj
 * @returns {*}
 */
const deepCopyArr = (obj: { [x: string]: any; constructor: ArrayConstructor }): any[] => {
  // return [...this]// 不能用  {...this}，因为 this 是 array类型，深拷贝出来的类型也得是 [] 类型
  const newobj = obj.constructor === Array ? [] : []
  if (typeof obj !== 'object') {
    return []
  }
  for (const i in obj) {
    // @ts-ignore
    newobj[i] = typeof obj[i] === 'object' ? deepCopyArr(obj[i]) : obj[i]
  }
  return newobj
}

/**
 *  扩展运算符实现数组的深拷贝
 *  http://blog.csdn.net/fungleo/article/details/54931379
 * @param obj
 * @returns {*}
 */
function copyArr (array: any[]) {
  return [...array]// 不能用  {...this}，因为 this 是 array类型，深拷贝出来的类型也得是 [] 类型
}

/**
 * https://www.cnblogs.com/lvmh/p/6104397.html
 * 优化版for循环 ,是所有循环遍历方法中性能最高的一种
 * 比 forEach 性能好，因 forEach 跳出循环 很麻烦 https://www.cnblogs.com/PheonixHkbxoic/p/5708749.html
 * eg:
 *    const name='123'
 *    const res=forLoop((item, index) => {
              if (item.name === name) {
                return item
              }
            }, [{name:'123'},{name:'321'}] )
 */
function forLoop (cb: Function, arr: any[]) {
  let result = null
  for (let i = 0, len = arr.length; i < len; i++) {
    if (cb) {
      result = cb(arr[i], i)
      if (result === -1) {
        continue
      } else if (result) { // result 可能为 对象 或者 true，只要满足 外部的查询条件,就跳出循环,return 查询到的 数据
        break // 跳出循环
      }
    }
  }
  return result
}

/**
 * 交换数组元素位置
 * http://www.fly63.com/article/detial/1089
 */
function exchangeItemIndex (array: any[], index1: number, index2: number) {
  array.splice(index2, 1, ...array.splice(index1, 1, array[index2]))
}

/*
一维数组变成二维数组
 */
const oneToTwoDimensional = (array: any[]) => {
  const arr: any[][] = []
  array && array.map(
      // @ts-ignore
      (value, index, array) => {
      if (arr.length > 0) {
        if (arr[arr.length - 1].length === 1) { // 最后一行数组元素只有一个对象
          arr[arr.length - 1].push(value)
        } else {
          arr.push([value])
        }
      } else {
        arr.push([value])
      }
    }
  )
  return arr
}

/**
 * 二维数组 变 一维数组
 * @param arr
 */
const twoToOneArr = (array: any[]) => {
  const arr: any[] = []
  array && array.map(
      // @ts-ignore
      (value, index, array) => {
      if (value instanceof Array) {
        value.map(
            // @ts-ignore
            (value1, index1, array) => {
            arr.push(value1)
          }
        )
      }
    }
  )
  return arr
}

/**
 * http://c.biancheng.net/view/5668.html
 * 数组元素截取，因 slice 方法的截取 传参很恶心，第 1 个参数指定起始下标位置，包括该值指定的元素；第 2 个参数指定结束位置，不包括指定的元素。所以 此方法 的传参 统一成 0开始的 数组下标 [startIndex,endIndex],起始下标和结束下标都包括
 */
const slice = (startIndex: number, endIndex: number, arr: string | any[]) => {
  const res = arr.slice(startIndex, endIndex + 1)
  return res
}

/**
 * 获取数组最后一个元素
 * @param arr
 * @returns {*}
 */
const getLastOne = (arr: any[]) => {
  return arr.slice(-1)[0]
}

/**
 * Create an array of a specified length and fill each item with a default value
 * The use of generic <T> can ensure that each item in the array is the type of the input defaultValue。
 * @param length
 * @param defaultValue
 * @returns {[]}
 */
function createArray<T> (length: number, defaultValue: T): Array<T> {
  const result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = defaultValue
  }
  return result
}

/*
用 分隔符 把数组元素 拼接 成一个 字符串
如 sep:'' ,这样字符串的字母之间就没有分隔符
 */
function join (str: string, arr: any[]) {
  return arr.join(str)
}

/**
 * 数组 插入 元素 到指定位置
 * @param index
 * @param item
 */
function insert (array:any[], index:number, item:any) {
  array.splice(index, 0, item)
}

/**
 * 返回数组最后一个元素
 * @param arr
 * @returns {any}
 */
const pop = (arr:any[]) => {
  return arr.pop()
}
/**
 * 创建一个指定长度的数组
 */
const newArray = (l: number = 0) => {
  return new Array(l).fill(0)
}

export default {
  filterSameEle,
  isContainValue,
  findObjIndex,
  findObjWithPredicate,
  remove,
  initArrayByObjValues,
  sortObjectArr,
  dedupe,
  copyArr,
  forLoop,
  exchangeItemIndex,
  filterSameItem,
  oneToTwoDimensional,
  twoToOneArr,
  slice,
  removeObject,
  deepCopyArr,
  getLastOne,
  createArray,
  join,
  insert,
  pop,
  newArray
}
