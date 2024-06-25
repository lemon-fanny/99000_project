import request from '@/utils/request';

export function ping() {
  return request({
    url: '/ping',
    method: 'get'
  });
}
