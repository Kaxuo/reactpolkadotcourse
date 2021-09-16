import './App.scss';
import { ContextProvider } from './substrate-lib/TodoContext';
import { SubstrateProvider } from './substrate-lib/BlockChainContext';
import Main from './components/Main/Main';
import Transfer from './components/Tranfer/Transfer';
import Create from './components/CreateItems/Create';
import Assets from './components/Assets/Assets';
import Status from './components/Status/Status';

function App() {
  return (
    <SubstrateProvider>
      <ContextProvider>
        <div className='App'>
          <Main />
          <div className='forms'>
            <Create />
            <Assets />
            <Transfer />
          </div>
          <Status />
        </div>
      </ContextProvider>
    </SubstrateProvider>
  );
}

export default App;
