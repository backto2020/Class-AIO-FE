import request from '@/utils/request';

export function deleteCommit(id) {
  return request({
    url: `/commit/${id}`,
    method: 'delete'
  });
}

export function editCommit(commit) {
  return request({
    url: '/commit',
    method: 'post',
    data: commit
  });
}

export function getCommitList() {
  return request({
    url: '/commit',
    method: 'get'
  });
}

export function newCommit(commit) {
  return request({
    url: '/commit',
    method: 'put',
    data: commit
  });
}

export function logCommit(id, formData) {
  return request({
    url: `/commit/${id}`,
    method: 'post',
    data: formData
  });
}

export function getCommitStatus(id) {
  return request({
    url: `/commit/${id}`,
    method: 'get'
  });
}
