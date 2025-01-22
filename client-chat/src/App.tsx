import React from 'react';
import Main from './main/main';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {

  return (
    <SnackbarProvider>
      <Main />
    </SnackbarProvider>
  );
  
};

export default App;
