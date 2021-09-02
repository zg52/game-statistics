import request from '@/utils/request'

// 获取List
export function getGmApp(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}/gmApp?current=${data.current}&size=${data.size}`,
    method: 'get',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  })
}

// 添加应用
export function AddToGmApp(data) {
  // return request({
  // 	url: `${api}/gmApp`,
  // 	method: 'post',
  // 	headers: {
  // 		'Content-Type': 'x-www-form-urlencoded'
  // 	},
  // 	data
  // })
  return request({
    url: `${process.env.VUE_APP_BASE_API}/gmApp?appType=${data.appType}&description=${data.description}&language=${data.language}&name=${data.name}&platType=${data.platType}`,
    method: 'post',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
    data
  })
}

// 获取应用详情
export function getGmAppInfo(id) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}/gmApp/${id}`,
    method: 'get',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  })
}

// 删除应用
export function deleteGmApp(id) {
  return request.delete(`${process.env.VUE_APP_BASE_API}/gmApp/${id}`)
}

// 修改应用
export function editGmApp(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}/gmApp/${data.id}/audit?appType=${data.appType}&description=${data.description}&language=${data.language}&name=${data.name}`,
    method: 'post',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  })
}