import request from '@/utils/request';

export function deleteNoti(id) {
  return request({
    url: `/noti/${id}`,
    method: 'delete'
  });
}

export function editNoti(user) {
  return request({
    url: '/noti',
    method: 'post',
    data: user
  });
}

export function getNotiList() {
  return request({
    url: '/noti',
    method: 'get'
  });
}

export function newNoti(newNoti) {
  return request({
    url: '/noti',
    method: 'put',
    data: newNoti
  });
}
