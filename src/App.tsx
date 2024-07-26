import { ConfigProvider } from 'antd';
import './App.css';
import { AppRouter } from './route';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8b5cf6', // color-violet-500
        },
      }}
    >
      <AppRouter />;
    </ConfigProvider>
  );
}

export default App;
