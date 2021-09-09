import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Transfer.module.scss';
import { useContext } from 'react';

function Transfer() {
  const { transfer, status, setform, form } = useContext(SubstrateContext);
  const onChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={styles.form}>
        1 Unit = 1000000000000
        <div className={styles.input}>
          <span>To</span>
          <input type='text' name='to' value={form.to} onChange={onChange} />
        </div>
        <div className={styles.input}>
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
    </>
  );
}

export default Transfer;
