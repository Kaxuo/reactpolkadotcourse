import { useContext, useEffect } from 'react';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Main.module.scss';

function Main() {
  const { accounts, balance, connection } = useContext(SubstrateContext);
  useEffect(() => {
    connection();
  }, []);
  const ellipsis = (string) =>
    string.length > 5 &&
    `${string.substring(0, 8)} ... ${string.substr(string.length - 10)}`;

  const displayAccounts = () => {
    return (
      <div>
        {accounts.map((account) => {
          return (
            <div className={styles.accounts} key={account.address}>
              <span className={styles.name}>{account.meta.name}</span>
              <span className={`${styles.accounts} ${styles.small}`}>
                {ellipsis(account.address)}
              </span>
              <span className={`${styles.accounts} ${styles.big}`}>
                {account.address}
              </span>
              <span className={styles.balance}>
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
