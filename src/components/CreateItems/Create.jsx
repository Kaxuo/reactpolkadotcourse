import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Create.module.scss';
import { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Create() {
  const { create } = useContext(SubstrateContext);
  const [id, setid] = useState(0);
  const onChange = (e) => {
    setid(e.target.value);
  };
  return (
    <div>
      <div className={styles.form}>
        <p className={styles.object}>Create Class</p>
        <div className={styles.unit}>
          <p className={styles.un}>Class Id = id</p>
        </div>
        <div className={styles.input}>
          <TextField
            className={styles.textField}
            id='outlined-basic'
            label='Object ID'
            variant='outlined'
            name='id'
            size='small'
            value={id}
            onChange={onChange}
            type='number'
          />
        </div>
        <div className={styles.button}>
          <Button
            className={styles.but}
            variant='contained'
            color='primary'
            onClick={() => create(id)}
          >
            Create Class
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Create;
