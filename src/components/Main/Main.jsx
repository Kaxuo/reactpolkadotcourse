import { useContext, useEffect } from 'react';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import './Main.scss';

function Main() {
  const {
    accounts,
    balance,
    connection,
    loadAccounts,
    transfer,
    status,
    setform,
    form,
  } = useContext(SubstrateContext);
  useEffect(async () => {
    await connection();
    let unsub = await loadAccounts();
    return () => unsub && unsub();
  }, []);

  const ellipsis = (string) =>
    string.length > 5 &&
    `${string.substring(0, 8)} ... ${string.substr(string.length - 10)}`;

  const onChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const displayAccounts = () => {
    return (
      <div>
        {accounts.map((account) => {
          return (
            <div className='accounts' key={account.address}>
              <span className='name'>{account.meta.name}</span>
              <span className='address small'>{ellipsis(account.address)}</span>
              <span className='address big'>{account.address}</span>
              <span className='balance'>
                {balance && balance[account.address]}
              </span>
            </div>
          );
        })}
        <div className='form'>
          <div className='input'>
            <span>To</span>
            <input type='text' name='to' value={form.to} onChange={onChange} />
          </div>
          <div className='input'>
            <span>amount</span>
            <input
              type='text'
              name='amount'
              value={form.amount}
              onChange={onChange}
            />
          </div>
          <button onClick={transfer}>Transfer</button>
        </div>

        <h1>{status}</h1>
      </div>
    );
  };
  return <>{displayAccounts()}</>;
}

export default Main;
