import { useState, createContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';

export const SubstrateContext = createContext();

export const SubstrateProvider = ({ children }) => {
  // Make the connection with the blockchain //
  const connection = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    await ApiPromise.create({ provider: wsProvider });
  };
  // load all accounts, including extensions //
  const loadAccounts = async () => {
    try {
      await web3Enable('React App');
      let accs = await web3Accounts();
      keyring.loadAll({ isDevelopment: true }, accs);
      let allAccounts = keyring.getPairs();
      setaccounts(allAccounts);
    } catch (e) {
      console.error(e);
    }
  };
  const [accounts, setaccounts] = useState([]);
  return (
    <SubstrateContext.Provider value={{ accounts, connection, loadAccounts }}>
      {children}
    </SubstrateContext.Provider>
  );
};
