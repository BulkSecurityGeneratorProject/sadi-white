import docCookies from '../helper/cookie'

export const POST_TEST_SUCCESSFUL = "SUCCESS_POSTING_TEST";
export const POST_TEST_FAIL = "FAILED_TO_POST_TEST";
export const PUT_TEST_SUCCESSFUL = "SUCCESS_PUTTING_TEST";
export const PUT_TEST_FAIL = "FAILED_TO_PUT_TEST";
export const DELETE_TEST_SUCCESSFUL = "DELETE_TEST_SUCCESSFUL";
export const DELETE_TEST_FAIL = "FAILED_TO_DELETE_TEST";
export const GET_LIST_TEST = "SUCCESS_GET_LIST_TEST";
export const GET_LIST_TEST_ERROR = "GET_LIST_TEST_ERROR";
export const GET_TEST_BY_ID_ERROR = "GET_TEST_BY_ID_ERROR";
export const GET_TEST_BY_ID_FETCH = "GET_TEST_BY_ID_FETCH";
export const GET_TEST_BY_ID_SUCCESSFUL = "GET_TEST_BY_ID_SUCCESSFUL";

// this action is used by redux-form
export function createOrUpdateTest(values, dispatch) {
    const test = { ...values, size: values.questions.length }
    let promise;
    if(test.id) {
      promise = dispatch(putTest(test))
    } else {
      promise = dispatch(postTest(test))
    }

    return promise
      .then(() => dispatch(getListTest()))
}

export function getTestById(id) {
  const token = docCookies.getItem('token')
  return async dispatch => {
    try {
      dispatch({ type: GET_TEST_BY_ID_FETCH })
      const response = await fetch(`/api/testings/${id}/admin`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: GET_TEST_BY_ID_SUCCESSFUL, data })
    } catch (error) {
      dispatch({ type: GET_TEST_BY_ID_ERROR, error: error.message })
    }
  }
}

export function getListTest(){
	return async dispatch => {
    const token = docCookies.getItem('token')
    const res = await fetch('/api/testings',{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    try {
      dispatch({ type: GET_LIST_TEST, testList: data })
    } catch (error) {
      dispatch({ type: GET_LIST_TEST_ERROR, error: error.message })
    }
  }
}

export function postTest(test){
  return async (dispatch) => {
    const token = docCookies.getItem('token')
    const response = await fetch('/api/testings',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(test),
    })
    if(response.status === 201) {
      dispatch({ type: POST_TEST_SUCCESSFUL, })
    }
    if(response.status === 500) {
      dispatch({ type: POST_TEST_FAIL, })
    }
  }
}

export function putTest(test) {
  return function(dispatch) {
    const token = docCookies.getItem('token')
    return fetch('/api/testings', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(test),
    })
      .then(res => {
        if (res.status === 201) {
          dispatch({
            type: PUT_TEST_SUCCESSFUL,
          });
        }
        if (res.status === 500) {
          dispatch({
            type: PUT_TEST_FAIL,
          })
        }
      });
  };
}

export function deleteTest(testId){
  return async (dispatch) => {
    const token = docCookies.getItem('token')
    const response = await fetch(`/api/testings/${testId}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })

    if(response.status === 200) {
      await dispatch(getListTest());
      return dispatch({ type: DELETE_TEST_SUCCESSFUL, });
    }

    if(response.status === 500) {
      return dispatch({ type: DELETE_TEST_FAIL, })
    }
  }
}
