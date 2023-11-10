import { localAxios } from '@/utils/http-commons.js';

const local = localAxios;

function planList(success, fail) {
  local.get(`/plan/list`).then(success).catch(fail);
}

export { planList };
