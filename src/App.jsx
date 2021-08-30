import './App.scss';
import Main from './components/Main';
import { ContextProvider } from './substrate-lib/SubstrateContext';

function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;
