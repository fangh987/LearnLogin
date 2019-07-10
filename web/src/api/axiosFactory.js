import axios from 'axios'
import Qs from 'qs'
import {
  getToken
} from "@/utils/auth";

const create = (type) => {
  let token = getToken()
  let ins = axios.create({
    baseURL: '/',
    timeout: 100000,
    responseType: type ? type : 'json',
    headers: {
      'Authorization': token
    },
    paramsSerializer(params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        allowDots: true
      })
    }
  })
  ins.interceptors.response.use((response) => {
    return response
  }, (error) => {
    console.dir(error)
    if (error.response) {
      let statusCode = error.response.status
      switch (statusCode) {
        case 401: // 用户未登录，跳转登录页面
          console.log('401');
          toLogin();
          break
        case 403:
          console.log('403');
          // toLogin();
          break
        case 404:
          console.log('404');
          // toLogin();
          break
        case 500:
          console.log('500');
          // toLogin();
          break
        default:
          window.alert('出错了:' + statusCode)
          // toLogin();
          break
      }
      return Promise.reject(error)
    } else {
      window.alert(error.message)
    }
  })
  return ins
}
const createUpload = (type) => {
  let token = getToken()
  let ins = axios.create({
    baseURL: '/',
    timeout: 100000,
    responseType: type ? type : 'json',
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    },
    paramsSerializer(params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        allowDots: true
      })
    }
  })
  return ins
}

const toLogin = () => {
  window.location.href = '/login.html';
}
// const printVue = () => {
//     console.dir(Vue)
// }
const procApiError = (err, errorCb) => {
  if (errorCb) {
    errorCb(err['message'])
  } else {
    console.error(err)
  }
}
const procApiCb = (res, cb, errorCb) => { // API正常返回结果的统一处理, 处理逻辑由后台服务API返回结果的结构决定
  let rData = res.data
  if (rData.code === "200" || rData.code === 0) {
    if (cb) {
      cb(rData['data'], rData['msg'])
    }
  } else {
    if (errorCb) {
      errorCb(rData['msg'], rData.code, rData['data'])
    } else {
      console.error(rData['msg'])
    }
  }
}
const procFileApiCb = (res, cb, errorCb) => { // API正常返回结果的统一处理, 处理逻辑由后台服务API返回结果的结构决定
  let rData = res
  if (rData) {
    if (cb) {
      cb(rData['data'], rData['msg'], res.headers)
    }
  } else {
    if (errorCb) {
      errorCb(rData['msg'], rData.code, rData['data'])
    } else {
      console.error(rData['msg'])
    }
  }
}
export default {
  post: (url, param, cb, errorCb) => {
    create().post(url, param).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      console.log(err)
      procApiError(err, errorCb)
    })
  },
  postForm: (url, form, cb, errorCb) => {
    create().post(url, {
      params: form
    }).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      console.log(err)
      procApiError(err, errorCb)
    })
  },
  postVoid: (url, cb, errorCb) => {
    create().post(url, {}).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      console.log(err)
      procApiError(err, errorCb)
    })
  },
  getCode: (url, code, cb, errorCb) => {
    create().get(url + '/' + code).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      procApiError(err, errorCb)
    })
  },
  get: (url, query, cb, errorCb) => {
    create().get(url, {
      params: query
    }).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      procApiError(err, errorCb)
    })
  },
  getVoid: (url, cb, errorCb) => {
    create().get(url, {}).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      procApiError(err, errorCb)
    })
  },
  exportFile: (url, cb, errorCb) => {
    create('blob').get(url).then(res => {
      procFileApiCb(res, cb, errorCb)
    }).catch(err => {
      procApiError(err, errorCb)
    })
  },
  upload: (url, param, cb, errorCb) => {
    createUpload().post(url, param).then(res => {
      procApiCb(res, cb, errorCb)
    }).catch(err => {
      procApiError(err, errorCb)
    })
  }

}
