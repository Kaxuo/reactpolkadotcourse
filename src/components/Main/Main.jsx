import { useContext, useEffect } from 'react';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';

function Main() {
  const { accounts, connection, loadAccounts } = useContext(SubstrateContext);
  useEffect(async () => {
    await connection();
    await loadAccounts();
  }, []);
  return (
    <>
      <h1 onClick={() => console.log(accounts)}>Hello</h1>
    </>
  );
}

export default Main;
