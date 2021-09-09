import { web3FromSource } from '@polkadot/extension-dapp';
// Get Selected account , for the moment, the account is hardcoded //
export const getFromAcct = async (api, keyring) => {
  const acc = '5CLr3qYnSLNkfDzoZKXYt7DDaZrYWe8AMpN4bVnYEHxyBBBD';
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


