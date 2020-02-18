import qs from 'qs';
import request from '@/utils/request';

export function resendPassword(data) {
  const options = qs.stringify(data);

  return request({
    url: '/resendPassword',
    method: 'post',
    data: options,
  });
}

export function signIn(data) {
  const options = qs.stringify(data);

  return request({
    url: '/authenticateByEmail',
    method: 'post',
    data: options,
  });
}

export function signUp(data) {
  const options = qs.stringify(data);

  return request({
    url: '/registerByEmail',
    method: 'post',
    data: options,
  });
}

export function checkEmail(data) {
  const options = qs.stringify(data);

  return request({
    url: '/preRegisterCheck',
    method: 'post',
    data: options,
  });
}
