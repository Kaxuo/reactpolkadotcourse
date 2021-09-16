import styles from './Assets.module.scss';
import { SubstrateContext } from '../../substrate-lib/BlockChainContext';
import { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Assets() {
  const { createAsset } = useContext(SubstrateContext);
  const [asset, setasset] = useState({ objectId: '', assetId: '' });
  const onChange = (e) => {
    setasset({ ...asset, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={styles.form}>
        <p className={styles.transfer}>Create Asset</p>
        <div className={styles.unit}>
          <p className={styles.un}>The Class Id must exist</p>
        </div>
        <TextField
          className={styles.textField}
          id='outlined-basic'
          label='Class ID'
          variant='outlined'
          name='objectId'
          type='number'
          size='small'
          value={asset.objectId}
          onChange={onChange}
        />
        <TextField
          className={styles.textField}
          id='outlined-basic'
          label='Asset ID'
          variant='outlined'
          name='assetId'
          size='small'
          type='number'
          value={asset.assetId}
          onChange={onChange}
        />
        <div className={styles.button}>
          <Button
            className={styles.but}
            variant='contained'
            color='primary'
            onClick={() => createAsset(asset.objectId, asset.assetId)}
          >
            Create Asset
          </Button>
        </div>
      </div>
    </>
  );
}

export default Assets;
