import qs from 'qs';
import request from '@/utils/request';

export async function signIn(o) {
  const options = qs.stringify(o);

  try {
    const { result = null, data = {}, error = {} } = await request({
      url: '/authenticate',
      method: 'post',
      data: options,
    });

    if (result) {
      return {
        data,
      };
    }

    if (error) {
      return {
        error,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function signUp(o) {
  const options = qs.stringify(o);

  try {
    const { result = null, data = {}, error = {} } = await request({
      url: '/register',
      method: 'post',
      data: options,
    });

    if (result) {
      return {
        data,
      };
    }

    if (error) {
      return {
        error,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}
