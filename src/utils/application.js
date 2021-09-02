import Cookies from 'js-cookie'

const ApplicationId = 'application_id'
const ApplicationInfo = 'application_info'

export function getApplicationId() {
  return Cookies.get(ApplicationId)
}

export function setApplicationId(id) {
  return Cookies.set(ApplicationId, id)
}

export function getApplicationInfo() {
  return Cookies.get(ApplicationInfo)
}

export function setApplicationInfo(info) {
  return Cookies.set(ApplicationInfo, info)
}