import { useState, createContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from '@polkadot/extension-dapp';
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

  // Get Selected account , for the moment, the account is hardcoded //
  const getFromAcct = async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    api = await ApiPromise.create({ provider: wsProvider });
    const acc = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
    const tempAcct = keyring.getPair(acc);
    const {
      address,
      meta: { source, isInjected },
    } = tempAcct;
    let fromAcct;
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = tempAcct;
    }
    return fromAcct;
  };

  // Methods to transfer token to another account //
  const transfer = async () => {
    const data = [form.to, form.amount];
    const fromAcct = await getFromAcct();
    const txExecute = api.tx.balances.transfer(...data);
    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
  };

  // Status text //
  const txResHandler = ({ status }) =>
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`);
  const txErrHandler = (err) =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);

  const [accounts, setaccounts] = useState([]);
  const [balance, setbalance] = useState({});
  const [status, setStatus] = useState('Nothing for the moment');
  const [unsub, setUnsub] = useState(null);
  const [form, setform] = useState({ to: '', amount: '' });
  return (
    <SubstrateContext.Provider
      value={{
        balance,
        accounts,
        connection,
        loadAccounts,
        transfer,
        status,
        unsub,
        setform,
        form,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
