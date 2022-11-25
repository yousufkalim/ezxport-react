import React, { Suspense, useEffect, useState } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import i18next from './utils/i18n';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/Common/ErrorFallback';
import Index from './routes/index';
import './css/index.css';

function App() {
  const [role, setRole] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const Role = JSON.parse(localStorage.getItem('role'));
    const lang = localStorage.getItem('language');
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage('fr');
    }

    if (!Role) {
      setRole('unknown');
    } else {
      setRole(Role);
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="App">
        <Suspense fallback="loading">
          <I18nextProvider i18n={i18next}>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={true}
              transition={Flip}
            />
            <Index role={role} />
          </I18nextProvider>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
export default App;
