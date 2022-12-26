import { configureStore } from '@reduxjs/toolkit';

import FormsReducer from '../features/forms/formsSlice';
import UserReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
    forms: FormsReducer,
  },
});

export default store;