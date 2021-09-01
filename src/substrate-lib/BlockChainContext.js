import { useState, createContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';

export const SubstrateContext = createContext();

export const SubstrateProvider = ({ children }) => {
  let api;
  // Make the connection with the blockchain //
  const connection = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    api = await ApiPromise.create({ provider: wsProvider });
  };
  // load all accounts, including those from extensions //
  const loadAccounts = async () => {
    try {
      await web3Enable('React App');
      let accs = await web3Accounts();
      keyring.loadAll({ isDevelopment: true }, accs);
      let allAccounts = keyring.getPairs();
      const addresses = allAccounts.map((account) => account.address);
      let unsubscribeAll = null;
      api.query.system.account
        .multi(addresses, (balances) => {
          const balancesMap = addresses.reduce(
            (acc, address, index) => ({
              ...acc,
              [address]: balances[index].data.free.toHuman(),
            }),
            {}
          );
          setbalance(balancesMap);
        })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
      setaccounts(allAccounts);
      return () => unsubscribeAll && unsubscribeAll();
    } catch (e) {
      console.error(e);
    }
  };

  const [accounts, setaccounts] = useState([]);
  const [balance, setbalance] = useState({});
  return (
    <SubstrateContext.Provider
      value={{ balance, accounts, connection, loadAccounts }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
