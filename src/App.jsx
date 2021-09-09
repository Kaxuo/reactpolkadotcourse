import './App.scss';
import { ContextProvider } from './substrate-lib/TodoContext';
import { SubstrateProvider } from './substrate-lib/BlockChainContext';
import Main from './components/Main/Main';
import Transfer from './components/Tranfer/Transfer';
import Create from './components/CreateItems/Create';
import Assets from './components/Assets/Assets';

function App() {
  return (
    <SubstrateProvider>
      <ContextProvider>
        <div className='App'>
          <Main />
          <Transfer />
          <Create />
          <Assets />
        </div>
      </ContextProvider>
    </SubstrateProvider>
  );
}

export default App;
