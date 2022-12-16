import { useReducer } from 'react';

function formReducer(state, action) {
  switch (action.type) {
    case 'FORM_LIST_REQUEST':
      return { loading: true, forms: [] };
    case 'FORM_LIST_SUCCESS':
      return { loading: false, forms: action.payload.forms };
    case 'FORM_LIST_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const useForms = () => {
  const [forms, dispatchForms] = useReducer(formReducer, {
    state: [],
    loading: false,
    error: null,
  });

  return [forms, dispatchForms];
};

export default useForms;