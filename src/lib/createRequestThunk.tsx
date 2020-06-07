import { Action } from 'redux-actions';

import { finishLoading, startLoading } from '../modules/loading';

export default function createRequestThunk(type: string, request: any) {
  // 성공 및 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params: any) => async (dispatch: any) => {
    dispatch({ type }); // 시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (errors) {
      dispatch({
        type: FAILURE,
        payload: errors,
        error: true,
      }); // 에러 발생
      dispatch(startLoading(type));
      throw errors;
    }
  };
}
