import { Suspense } from 'react';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './styles/style.css';
import App from './App';

import './utils/i18n';
import { AuthContextProvider } from './context/AuthContext';
import CustomRouter from './components/CustomRouter';

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <CustomRouter history={history}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </CustomRouter>
  </AuthContextProvider>
);
