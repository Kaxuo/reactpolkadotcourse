import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Transfer.module.scss';
import { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Transfer() {
  const { transfer, setform, form } = useContext(SubstrateContext);
  const onChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const deleteRecipient = () => {
    setform({ ...form, to: '' });
  };
  return (
    <>
      <div className={styles.form}>
        <p className={styles.transfer}>Transfer</p>
        <div className={styles.unit}>
          <p className={styles.un}>1 Unit = 1 Walchain</p>
        </div>
        <TextField
          className={styles.textField}
          id='outlined-basic'
          label='Recipient'
          variant='outlined'
          name='to'
          size='small'
          value={form.to}
          onChange={onChange}
        />
        <HighlightOffIcon onClick={deleteRecipient} className={styles.delete} />
        <TextField
          className={styles.textField}
          id='outlined-basic'
          label='Amount'
          variant='outlined'
          name='amount'
          size='small'
          type='number'
          value={form.amount}
          onChange={onChange}
        />
        <div className={styles.button}>
          <Button
            className={styles.but}
            variant='contained'
            color='primary'
            onClick={transfer}
          >
            Transfer
          </Button>
        </div>
      </div>
    </>
  );
}

export default Transfer;
