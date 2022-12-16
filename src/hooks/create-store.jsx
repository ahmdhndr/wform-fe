/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext, createContext, useReducer, useMemo } from 'react';

function createStore(rootReducer, initialState) {
  const store = createContext({
    state: initialState,
    dispatch: () => {},
  });

  function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    return (
      <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
    );
  }

  const Connect = ({ children, selector }) => {
    const { state, dispatch } = useContext(store);
    const selected = selector(state);
    return useMemo(
      () => children({ state: selected, dispatch }),
      [selected, dispatch, children]
    );
  };
  return { StoreProvider, Connect };
}

export default createStore;
