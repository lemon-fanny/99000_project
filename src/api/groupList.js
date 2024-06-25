import request from '@/utils/request'

export function groupListAPI(query) {
  return request({
    url: '/groups',
    method: 'get',
    params: query
  })
}

export function stdListAPI() {
  return request({
    url: '/users-without-group',
    method: 'get'
  })
}

export function createGroupAPI(data) {
  return request({
    url: '/group/create',
    method: 'post',
    data
  })
}

export function joinGroupAPI(data) {
  return request({
    url: '/group/join',
    method: 'post',
    data
  })
}

export function leaveGroupAPI(data) {
  return request({
    url: '/group/leave',
    method: 'post',
    data
  })
}

