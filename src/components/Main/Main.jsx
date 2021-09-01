import { useContext, useEffect } from 'react';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import './Main.scss';

function Main() {
  const { accounts, balance, connection, loadAccounts } =
    useContext(SubstrateContext);
  useEffect(async () => {
    await connection();
    await loadAccounts();
  }, []);

  const displayAccounts = () => {
    return (
      <div>
        {accounts.map((account) => {
          return (
            <div className='accounts' key={account.address}>
              <span className='name'>{account.meta.name}</span>
              <span className='address'>{account.address}</span>
              <span className='balance'>
                {balance && balance[account.address]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  return <>{displayAccounts()}</>;
}

export default Main;
