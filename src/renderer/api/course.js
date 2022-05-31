import request from '@/utils/request';

export function getAllCourseList() {
  return request({
    url: '/course/all',
    method: 'get'
  });
}

export function getSelectedCourseList() {
  return request({
    url: '/course',
    method: 'get'
  });
}

export function selectCourses(data) {
  return request({
    url: '/course',
    method: 'put',
    data
  });
}
