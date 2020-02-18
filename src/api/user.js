import qs from 'qs';
import request from '@/utils/request';

export function getProfile() {
  return request({
    url: '/getProfile',
    method: 'get',
  });
}

export function setProfile(data) {
  const options = qs.stringify(data);

  return request({
    url: '/updateProfile',
    method: 'post',
    data: options,
  });
}

export function logOut() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

export function requestPasswordReset(data) {
  const options = qs.stringify(data);

  return request({
    url: '/requestPasswordReset',
    method: 'post',
    data: options,
  });
}

export function passwordReset(data) {
  const options = qs.stringify(data);

  return request({
    url: '/passwordReset',
    method: 'post',
    data: options,
  });
}

export function resendPassword() {
  return request({
    url: '/resendPassword',
    method: 'post',
  });
}
