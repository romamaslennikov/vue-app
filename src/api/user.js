// import qs from 'qs';
import request from '@/utils/request';

export function getProfile() {
  return request({
    url: '/getProfile',
    method: 'get',
  });
}

export function logOut() {
  return request({
    url: '/logout',
    method: 'post',
  });
}
