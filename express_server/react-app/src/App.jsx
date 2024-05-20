import { AuthWrapper } from './auth/AuthWrapper';
import { HashRouter, BrowserRouter } from 'react-router-dom';

export default function App() {

  return (
    <>
      <HashRouter>
        <AuthWrapper />
      </HashRouter>
    </>
  )
}

