import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './assets/styles/style.css';
import App from './App';

import './utils/i18n';
import store from './app/store';
import { injectStore } from './middleware/axiosInterceptorsMiddleware';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
