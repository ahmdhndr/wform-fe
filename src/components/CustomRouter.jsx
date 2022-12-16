/* eslint-disable react/prop-types */
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

function CustomRouter({ history, ...props }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}

export default CustomRouter;
