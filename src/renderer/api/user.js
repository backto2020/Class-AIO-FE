import request from '@/utils/request';

export function deleteUser(sid) {
  return request({
    url: `/user/${sid}`,
    method: 'delete'
  });
}

export function editUser(user) {
  return request({
    url: '/user',
    method: 'put',
    data: user
  });
}

export function getUserList() {
  return request({
    url: '/user/list',
    method: 'get'
  });
}

export function newUser(newUser) {
  return request({
    url: '/user',
    method: 'post',
    data: newUser
  });
}
