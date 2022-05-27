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
    method: 'post',
    data: acti
  });
}

export function getActiList() {
  return request({
    url: '/acti',
    method: 'get'
  });
}

export function newActi(newActi) {
  return request({
    url: '/acti',
    method: 'put',
    data: newActi
  });
}

export function loginActi(id) {
  return request({
    url: `/acti/login/${id}`,
    method: 'put'
  });
}
