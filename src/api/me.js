// import qs from 'qs';
import request from '@/utils/request';

export async function getProfile() {
  try {
    const { result = null, data = {} } = await request({
      url: '/getProfile',
      method: 'get',
    });

    if (result) {
      return {
        data,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}

export function logOut() {
  return request({
    url: '/logout',
    method: 'post',
  });
}
