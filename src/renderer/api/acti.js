import request from '@/utils/request';

export function deleteActi(id) {
  return request({
    url: `/acti/${id}`,
    method: 'delete'
  });
}

export function editActi(acti) {
  return request({
    url: '/acti',
    method: 'put',
    data: acti
  });
}

export function getActiList() {
  return request({
    url: '/acti',
    method: 'get'
  });
}

export function newActi(acti) {
  return request({
    url: '/acti',
    method: 'post',
    data: acti
  });
}

export function loginActi(id) {
  return request({
    url: `/acti/login/${id}`,
    method: 'put'
  });
}

export function getActiLoginStatus(id) {
  return request({
    url: `/acti/login/${id}`,
    method: 'get'
  });
}
