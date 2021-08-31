import './App.scss';
import Main from './components/Main/Main';
import { ContextProvider } from './substrate-lib/TodoContext';
import { SubstrateProvider } from './substrate-lib/BlockChainContext';

function App() {
  return (
    <SubstrateProvider>
      <ContextProvider>
        <div className='App'>
          <Main />
        </div>
      </ContextProvider>
    </SubstrateProvider>
  );
}

export default App;
