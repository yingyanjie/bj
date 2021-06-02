var Common = {};
import request from "@/utils/request";
import { GET_DDCODE_DATA } from "@/api/api";
Common.getDataTime = (value,format = 'yyyy-MM-dd HH:mm:ss') =>{
      if (value === "") {
          return
      } else {
          let date = new Date(value)
          var o = {
            'M+' : date.getMonth() + 1, //month
            'd+' : date.getDate(), //day
            'H+' : date.getHours(), //hour小时
            'm+' : date.getMinutes(), //minute
            's+' : date.getSeconds(), //second
            'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
            'S' : date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      
        for (var k in o)
            if (new RegExp('(' + k + ')').test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      
        return format;
      }
  }
/**
 * 获取数字字典数据
 * @param ddCode   字典项参数
 * @returns []
 */
Common.getDataRespority = (ddCode) => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: GET_DDCODE_DATA,
      data: {
        ddCode
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  })
}
Common.getToken = () => {
  try {
    const token = uni.getStorageSync('userInfo');
    return JSON.parse(token).token
  } catch (e) {
    return ''
  }
}
Common.getUserInfo = () => {
  try {
    const userInfo = uni.getStorageSync('userInfo');
    return JSON.parse(userInfo)
  } catch (e) {
    return ''
  }
}
Common.firstLetterSort = (data, field) => {
  let list = JSON.parse(JSON.stringify(data))
  const reg = new RegExp("^[\u4e00-\u9fa5]");
  let list1 = list.filter(item=>reg.test(item[field])) //中文
  let list2 = list.filter(item=>!reg.test(item[field])) //英文
  list2.forEach(item=>{
    item.letter = (item[field]).substr(0, 1).toUpperCase();
  })
  list1.sort((a,b)=> a[field].localeCompare(b[field], 'zh'))
  list2.sort((a,b)=> a.letter.charCodeAt(0) - b.letter.charCodeAt(0));
  return list2.concat(list1)
}
export {
  Common
}