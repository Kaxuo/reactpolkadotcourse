import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Create.module.scss';
import { useContext, useState } from 'react';

function Create() {
  const { create } = useContext(SubstrateContext);
  const [id, setid] = useState(0);
  const onChange = (e) => {
    setid(e.target.value);
  };
  return (
    <div>
      <div className={styles.form}>
        <div className={styles.input}>
          <span>ObjectID</span>
          <input type='text' name='id' value={id} onChange={onChange} />
        </div>
        <button onClick={() => create(id)}>Submit</button>
      </div>
    </div>
  );
}
export default Create;
