import qs from 'qs';
import request from '@/utils/request';

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
