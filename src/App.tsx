import React from 'react';
import 'antd/dist/antd.css';
import MainPage from './pages/MainPage';
import AuthWrapper from './components/Auth/AuthWrapper';

const App: React.FC = () => (
  <AuthWrapper>
    <MainPage />
  </AuthWrapper>
);

export default App;
