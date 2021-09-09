import { useState, createContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { getFromAcct } from '../helpers/helpers';

export const SubstrateContext = createContext();

export const SubstrateProvider = ({ children }) => {
  let hoang = '5CLr3qYnSLNkfDzoZKXYt7DDaZrYWe8AMpN4bVnYEHxyBBBD';
  const [api, setApi] = useState(null);
  // Make the connection with the blockchain //
  const connection = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    let con = await ApiPromise.create({ provider: wsProvider });
    setApi(con);
    loadAccounts(con);
  };

  /* Queries */
  // load all accounts, including those from extensions //
  const loadAccounts = async (api) => {
    try {
      await web3Enable('React App');
      let accs = await web3Accounts();
      keyring.loadAll({ isDevelopment: true }, accs);
      let allAccounts = keyring.getPairs();
      allAccounts = allAccounts.map(({ address, meta }) => {
        return {
          address: address,
          meta: {
            ...meta,
            name: `${meta.name} ${meta.isInjected ? `(${meta.source})` : ''}`,
          },
        };
      });
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
      return unsubscribeAll;
    } catch (e) {
      console.error(e);
    }
  };
  /*************************************/

  /* Transactions */
  // Methods to transfer token to another account //
  const transfer = async () => {
    unsubscribe();
    setStatus('Sending...');
    const fromAcct = await getFromAcct(api, keyring);
    const data = [form.to, form.amount];
    const txExecute = api.tx.balances.transfer(...data);
    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };

  // Create class of objects //
  const create = async (id) => {
    unsubscribe();
    const fromAcct = await getFromAcct(api, keyring);
    const data = [id, hoang];
    let txExecute = api.tx.uniques.create(...data);
    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };
  // Create assets from a class //
  const createAsset = async (objectId, assetId) => {
    unsubscribe();
    const fromAcct = await getFromAcct(api, keyring);
    const data = [objectId, assetId, hoang];
    let txExecute = api.tx.uniques.mint(...data);
    console.log(txExecute);
    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };

  const [accounts, setaccounts] = useState([]);
  const [balance, setbalance] = useState({});
  const [status, setStatus] = useState('Nothing for the moment');
  const [unSub, setUnsub] = useState(null);
  const [form, setform] = useState({ to: '', amount: '' });
  /*************************************/

  /*  Helpers Function */
  const unsubscribe = () => {
    if (unSub) {
      unSub();
      setUnsub(null);
    }
  };

  // Status text //
  const txResHandler = ({ status }) => {
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`);
  };

  const txErrHandler = (err) =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);
  /*************************************/

  return (
    <SubstrateContext.Provider
      value={{
        accounts,
        balance,
        connection,
        transfer,
        status,
        setform,
        form,
        create,
        createAsset,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
