/**
 * https://www.cnblogs.com/carekee/articles/1678041.html
 */
import * as stringTools from './stringTools'

interface DateObj {
  y:number|string;
  m:number|string;
  d:number|string;
  h?:number|string;
  mm?:number|string;
  s?:number|string;
}

/**
 2个 date 对象 是否相等
 */
const isEqualDate = (date1:Date, date2:Date):boolean => {
  const date1Data = getDateData(date1)
  const date2Data = getDateData(date2)
  return date1Data.y === date2Data.y && date1Data.m === date2Data.m && date1Data.d === date2Data.d
}

/**
 得到日期 date 对象对应的 年月日时分秒 数据,补0
 */
const getDateData = (date:Date):DateObj => {
  const now = date
  const y = now.getFullYear() // 年
  const m = now.getMonth() + 1 // 月
  const d = now.getDate() // 日
  const h = now.getHours() // 时
  const mm = now.getMinutes() // 分
  const s = now.getSeconds()// 秒
  return {
    y,
    m: m < 10 ? `0${m}` : m,
    d: d < 10 ? `0${d}` : d,
    h: h < 10 ? `0${h}` : h,
    mm: mm < 10 ? `0${mm}` : mm,
    s: s < 10 ? `0${s}` : s
  }
}

/**
 得到日期 date 对象对应的 年月日时分秒 数据，不 补全0
 */
const getDateDataWithoutZero = (date:Date):DateObj => {
  const now = date
  const y = now.getFullYear() // 年
  const m = now.getMonth() + 1 // 月
  const d = now.getDate() // 日
  const h = now.getHours() // 时
  const mm = now.getMinutes() // 分
  const s = now.getSeconds()// 秒
  return {
    y,
    m,
    d,
    h,
    mm,
    s
  }
}

/**
 *比较 2个 getDateDataWithoutZero 返回的 对象的 大小,
 * @param one
 * @param two
 * true:one >two
 */
const compareTwoDateData = (one:DateObj, two:DateObj) => {
  // @ts-ignore
  return one.y >= two.y && one.m >= two.m && one.d >= two.d && one.h >= two.h && one.mm > two.mm && one.s > two.s
}

/**
 * 得到时间戳对应的 年月日数据
 * @param timeStamp 毫秒
 * @returns {null}
 */
const getTimestampData = (timeStamp:number) => {
  if (timeStamp) {
    return getDateData(new Date(timeStamp))
  } else {
    return null
  }
}

/**
 * @param {*} str :''
 */
const allocDate = (str:string):Date => {
  return new Date(str)
}

const curentTime = () :DateObj => {
  const now = new Date()

  const y = now.getFullYear() // 年
  const m = now.getMonth() + 1 // 月
  const d = now.getDate() // 日

  const h = now.getHours() // 时
  const mm = now.getMinutes() // 分
  const s = now.getSeconds()// 秒

  return {
    y,
    m,
    d,
    h,
    mm,
    s
  }
}

// 获取当前时间的 时间戳
const curTimeStamp = () :number => {
  // console.log('new Date().getTime()=', new Date().getTime())
  // console.log('Date.parse(new Date().toString())=', Date.parse(new Date().toString()))

  // 这个方法
  //   和
  //   Date.parse(new Date().toString())
  //   拿到的
  //   毫秒相差
  //   一点
  // return new Date().getTime()

  return Date.parse(new Date().toString())
}

// 一天的 毫秒数
const dayTimeStamp = 24 * 60 * 60 * 1000

/**
 获取当前日期的 前天、昨天、今天、明天、后天的 数据对象
 */
const addDayCount = (AddDayCount:number) => {
  const dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 // 获取当前月份的日期
  const d = dd.getDate()
  return {
    y,
    m,
    d
  }
}

/**
 求两个时间的天数差 参数 y,m,d 格式为 int 类型
 DateOne:{
  y,m,d
}
 */
const daysBetween = (DateOne:DateObj, DateTwo:DateObj) => {
  // @ts-ignore
  const clock = ({ y, m, d }) :string => {
    let res = y + '-'
    if (m > 10) {
      res += '0'
    }
    res += m + '-'
    if (d < 10) {
      res += '0'
    }
    res += d + ' '
    return res
  }

  const _DateOne = clock(DateOne)
  const _DateTwo = clock(DateTwo)

  const OneMonth = _DateOne.substring(5, _DateOne.lastIndexOf('-'))
  const OneDay = _DateOne.substring(
    _DateOne.length,
    _DateOne.lastIndexOf('-') + 1
  )
  const OneYear = _DateOne.substring(0, _DateOne.indexOf('-'))

  const TwoMonth = _DateTwo.substring(5, _DateTwo.lastIndexOf('-'))
  const TwoDay = _DateTwo.substring(
    _DateTwo.length,
    _DateTwo.lastIndexOf('-') + 1
  )
  const TwoYear = _DateTwo.substring(0, _DateTwo.indexOf('-'))

  const cha =
    (Date.parse(OneYear + '/' + OneMonth + '/' + OneDay) -
      Date.parse(TwoYear + '/' + TwoMonth + '/' + TwoDay)) /
    86400000
  return Math.abs(cha)
}

/**
 str: xx-xx-xx 转成 对象
 */
const splitDateStrToOb = (str:string):DateObj|null => {
  if (!str) {
    return null
  }
  const arr = str.split('-') // 字符分割
  return {
    y: arr.length > 0 ? Number(arr[0]) : '',
    m: arr.length > 1 ? Number(arr[1]) : '',
    d: arr.length > 2 ? Number(arr[2]) : ''
  }
}

/**
 * 时间戳转成 "xxxx-xx-xx" 字符串
 */
const timeStampTo_xxxx_xx_xx = (timeStamp:number):string => {
  const dateObj = getDateData(new Date(timeStamp))
  // console.log(
  //   'dateTools.js timeStampTo_xxxx_xx_xx timeStamp=',
  //   timeStamp,
  //   ' dateObj=',
  //   dateObj
  // )
  return `${dateObj.y}-${dateObj.m}-${dateObj.d}`
}

// +---------------------------------------------------
// | 取得日期数据信息
// | 参数 type 表示数据类型
// |     y 年 m月 d日 w星期 ww周 h时 n分 s秒
// 如果 type==w,return 今天|明天|周一。。。周日
// +---------------------------------------------------
const datePart = (type:string, myDate:Date):string|number => {
  let partStr :string|number = ''
  const Week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  switch (type) {
    case 'y':
      partStr = myDate.getFullYear()
      break
    case 'm':
      partStr = myDate.getMonth() + 1
      break
    case 'd':
      partStr = myDate.getDate()
      break
    case 'w':
      partStr = Week[myDate.getDay()]
      break
    // case 'ww':
    //   partStr = myDate.WeekNumOfYear()
    //   break
    case 'h':
      partStr = myDate.getHours()
      break
    case 'n':
      partStr = myDate.getMinutes()
      break
    case 's':
      partStr = myDate.getSeconds()
      break
  }
  const now = new Date()
  if (isEqualDate(myDate, now)) {
    partStr = '今天'
  }

  const date1Data = getDateData(now)
  const date2Data = getDateData(myDate)
  if (daysBetween({
    y: date1Data.y, m: date1Data.m, d: date1Data.d
  }, {
    y: date2Data.y, m: date2Data.m, d: date2Data.d
  }) === 1) {
    partStr = '明天'
  }
  return partStr
}

/**
 * 计算2个时间 相差的 时间
 * @param {*} startTime 可以为 毫秒级别的时间戳 | "2019-05-24 16:43:10"类型的时间字符串 等等
 * @param {*} endTime 同上
 */
const intervalTime = (startTime:number|string, endTime:number|string) => {
  const date1 = new Date(startTime)// 开始时间
  const date2 = new Date(endTime)// 结束时间
  const date3 = date2.getTime() - date1.getTime()// 时间差的毫秒数
  // 计算出相差天数
  const days = Math.floor(date3 / (24 * 3600 * 1000))
  // 计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000)// 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000)// 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000)// 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  return {
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
    milliseconds: date3// 相差的 毫秒时间戳
  }
}

/**
 * 一个毫秒时间戳 转成 是 xx 天 xx 时 xx 分 xx 秒
 * @param {*} timeStamp  毫秒时间戳
 */
const formatTimeStamp = function (timeStamp:number) {
  const days = parseInt(`${timeStamp / (1000 * 60 * 60 * 24)}`)
  const hours = parseInt(`${(timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)}`)
  const minutes = parseInt(`${(timeStamp % (1000 * 60 * 60)) / (1000 * 60)}`)
  const seconds = parseInt(`${(timeStamp % (1000 * 60)) / 1000}`)
  return {
    d: days, h: hours, m: minutes, s: seconds
  }
}

// 计算 传入的 结束时间的 时间戳 和当前时间 相差的 时间数据
const getLeftStamp = (endDateTimeStamp:number = 1562830622000):DateObj|null => {
  // let endDateTimeStamp = Date.parse(new Date(endTimeStamp).toString()) //结束时间的 时间戳
  const nowDateTimeStamp = Date.parse(new Date().toString()) // 当前时间的 时间戳
  // console.log('endDateTimeStamp=', endDateTimeStamp, ' nowDateTimeStamp=', nowDateTimeStamp)

  let diff = (endDateTimeStamp - nowDateTimeStamp) / 1000
  // console.log('剩余的时间=', diff)

  if (diff <= 0) {
    return null
  }

  const timeLeft = {
    y: 0,
    d: 0,
    h: 0,
    m: 0,
    s: 0
  }

  if (diff >= (365.25 * 86400)) {
    timeLeft.y = Math.floor(diff / (365.25 * 86400))
    diff -= timeLeft.y * 365.25 * 86400
  }
  if (diff >= 86400) {
    timeLeft.d = Math.floor(diff / 86400)
    diff -= timeLeft.d * 86400
  }
  if (diff >= 3600) {
    timeLeft.h = Math.floor(diff / 3600)
    diff -= timeLeft.h * 3600
  }
  if (diff >= 60) {
    timeLeft.m = Math.floor(diff / 60)
    diff -= timeLeft.m * 60
  }
  timeLeft.s = diff
  return timeLeft
}

/**
 * 根据传进来的 时间数据和 分隔符，返回一个 时间字符串，如 xxxx.xx.xx ,月和日都是 自动前边补0
 */
const formatDateObjToString = ({
                                 // @ts-ignore
                                 y, m, d, str
}) => {
  if (!y || !m || !d) {
    return null
  }
  if (typeof m === 'string') {
    m = Number(m)
  }
  if (typeof d === 'string') {
    d = Number(d)
  }
  let mm = m

  if (m < 10) {
    mm = `0${m}`
  }
  let dd = d
  if (d < 10) {
    dd = `0${d}`
  }
  return `${y}` + str + `${mm}` + str + `${dd}`
}

/**
 * 毫秒转成 xx:xx:xx (小时:分:秒)
 * @param msd
 * @returns {string}
 */
const millisecondToDate = (msd:string) => {
  let time:string|number = parseFloat(msd) / 1000 // 秒
  if (time != null) {
    if (time > 60 && time < 60 * 60) { // 1分-1小时
      let min:string|number = parseInt(`${time / 60.0}`)// 分
      if (min < 10) {
        min = `0${min}`
      }
      let s:string|number = parseInt(`${(parseFloat(`${time / 60.0}`) -
          parseInt(`${time / 60.0}`)) * 60}`)
      if (s < 10) {
        s = `0${s}`
      }
      time = min + ':' + s
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) { // 1小时-1天
      let h:string|number = parseInt(`${time / 3600.0}`) // 小时
      if (h < 10) {
        h = `0${h}`
      }
      let min:string|number = parseInt(`${(parseFloat(`${time / 3600.0}`) -
          parseInt(`${time / 3600.0}`)) * 60}`) // 分
      if (min < 10) {
        min = `0${min}`
      }
      // 秒
      let s:string|number = parseInt(`${(parseFloat(`${(parseFloat(`${time / 3600.0}`) - parseInt(`${time / 3600.0}`)) * 60}`) -
          parseInt(`${(parseFloat(`${time / 3600.0}`) - parseInt(`${time / 3600.0}`)) * 60}`)) * 60}`)
      if (s < 10) {
        s = `0${s}`
      }
      time = h + ':' + min + ':' + s
    } else { // <1分
      if (time < 10) {
        time = `00:0${parseInt(`${time}`)}`
      } else {
        time = `00:${parseInt(`${time}`)}`
      }
    }
  }
  return time
}

/**
 * 时间显示格式化
 * @param timestamp
 * @returns {string}
 */
const timeFormat = function (timestamp :number):string {
  const current = new Date().getTime()
  const diffTime = current - timestamp

  const timeSecond = parseInt(`${diffTime / 1000}`)
  const timeMinute = parseInt(`${timeSecond / 60}`)
  const timeHour = parseInt(`${timeMinute / 60}`)
  const timeDay = parseInt(`${timeHour / 24}`)
  const timeMonth = parseInt(`${timeDay / 30}`)
  const timeYear = parseInt(`${timeMonth / 12}`)

  const date = new Date(timestamp)
  const year = date.getFullYear()
  let month:string|number = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day:string|number = date.getDate()
  day = day < 10 ? `0${day}` : day
  let h = date.getHours().toString()
  let m = date.getMinutes().toString()
  let s:string|number = date.getSeconds().toString()
  h = h.length === 1 ? '0' + h : h
  m = m.length === 1 ? '0' + m : m
  s = s.length === 1 ? '0' + s : s

  if (timeYear >= 1) { // 大于一年
    return year + '-' + month + '-' + day
  } else if (timeMonth >= 1) { // 大于一个月
    return month + '-' + day + ' ' + h + ':' + m
  } else if (timeDay >= 1) { // 大于一天
    return month + '-' + day + ' ' + h + ':' + m
  } else if (timeHour >= 1) {
    return `${timeHour}小时前`
  } else if (timeMinute >= 1) {
    return `${timeMinute}分钟前`
  } else {
    return '刚刚'
  }
}

/**
 * 把  https://github.com/OvalMoney/react-native-fitness  库返回的 时间 字符串(2020-11-05T02:00:00Z)转成 接口需要的 时间字符串 (2020-08-21 09:00:00)
 * https://www.cnblogs.com/sanyekui/p/13204062.html
 * need_h_mm_s 是否需要 时分秒
 * @type {string}
 */
const formatFitnessDateStrToApiDateStr = (str:string, need_h_mm_s:boolean = true):string => {
  if (stringTools.isNull(str)) {
    // console.log('dateTools.js formatFitnessDateStrToApiDateStr str=null')
    return ''
  }
  // 数字补0操作
  const addZero = (num:number) => {
    return num < 10 ? '0' + num : num
  }

  const arr = str.split('T')
  const d = arr[0]
  const darr = d.split('-')

  const t = arr[1]
  const tarr = t.split('.000')
  const marr = tarr[0].split(':')

  let dd =
    parseInt(darr[0]) +
    '-' +
    addZero(parseInt(darr[1])) +
    '-' +
    addZero(parseInt(darr[2]))
  if (need_h_mm_s) {
    dd +=
      ' ' +
      addZero(parseInt(marr[0])) +
      ':' +
      addZero(parseInt(marr[1])) +
      ':' +
      addZero(parseInt(marr[2]))
  }
  // console.log('formatFitnessDateStrToDate dd=', dd)
  return dd
}

/**
 * Date 对象转成 "Wed Sep 02 2020" 格式对象
 * @param date
 * @returns {string}
 */
const formatTo_enDate = (date:Date) => {
  const arr = date.toDateString().split(' ')
  return {
    en_day_of_the_week: arr[0],
    en_month: arr[1],
    day: arr[2],
    y: arr[3]
  }
}

/**
 * Convert the string with the date format '2018-09-10 08:00:00' into a Date object
 */
const convert_xxxx_xx_xx_toDate = (str:string) => {
  if (!str) {
    return new Date()
  }
  let _str = str
  _str = _str.replace(/-/g, '/')
  return new Date(_str)
}

/**
 * 'xxx-xx-xx' to timestamp
 */
const xxxx_xx_xx_to_timestamp = (xxxx_xx_xx:string) => {
  const date = convert_xxxx_xx_xx_toDate(xxxx_xx_xx)
  const timestamp = date.getTime()
  // console.log(
  //   'dateTools.js xxxx_xx_xx_to_timestamp xxxx_xx_xx=',
  //   xxxx_xx_xx,
  //   ' timestamp=',
  //   timestamp
  // )
  return timestamp
}

/**
 * https://blog.csdn.net/pengpengzhou/article/details/104774480
 * How many timestamp does the UTC time differ from the current time zone
 * @returns {number}
 * @constructor
 */
const UTC_local_offset = () => {
  const minutes = new Date().getTimezoneOffset()
  const timeStamp = minutes * 60 * 1000
  // console.log('dateTools.js UTC - local offset(timeStamp):' + timeStamp)
  return timeStamp * -1
}

const englishAbbreviationOfDayOfTheWeek = [
  {
    name: 'Mon',
    steps: 0
  },
  {
    name: 'Tue',
    steps: 0
  },
  {
    name: 'Wed',
    steps: 0
  },
  {
    name: 'Thu',
    steps: 0
  },
  {
    name: 'Fri',
    steps: 0
  },
  {
    name: 'Sat',
    steps: 0
  },
  {
    name: 'Sun',
    steps: 0
  }
]

/**
 * monday:{y: xxxx, m: xx, d: xx}
 * sunday:{y: xxxx, m: xx, d: xx}
 */
const getMondayAndSunday = () => {
  const day = new Date().getDay()
  // console.log('dateTools.js day=', day)
  const monday = dateTools.addDayCount((day - 1) * -1)
  // console.log('dateTools.js monday=', monday)
  const sunday = dateTools.addDayCount(7 - day)
  // console.log('dateTools.js sunday=', sunday)
  return {
    monday,
    sunday
  }
}

/**
 *  [0-6]correspond['日', '一', '二', '三', '四', '五', '六'] According to local time, return the day of the week in a specific date, 0  means Sunday
 */
const getDay = () => {
  const day = new Date().getDay()
  // console.log('dateTools.js getDay day=', day)
  return day
}

const english_month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

// 现在 外部声明，这些方法 才能互相调用
const dateTools = {
  isEqualDate,
  getTimestampData,
  timeFormat,
  getDateData,
  formatDateObjToString,
  curentTime,
  millisecondToDate,
  addDayCount,
  curTimeStamp,
  daysBetween,
  getDateDataWithoutZero,
  splitDateStrToOb,
  compareTwoDateData,
  datePart,
  allocDate,
  dayTimeStamp,
  intervalTime,
  formatTimeStamp,
  getLeftStamp,
  timeStampTo_xxxx_xx_xx,
  formatFitnessDateStrToApiDateStr,
  formatTo_enDate,
  convert_xxxx_xx_xx_toDate,
  xxxx_xx_xx_to_timestamp,
  UTC_local_offset,
  getMondayAndSunday,
  getDay,
  englishAbbreviationOfDayOfTheWeek,english_month
}

export default dateTools
