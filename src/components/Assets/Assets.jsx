import styles from './Assets.module.scss';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import { useContext, useState } from 'react';

function Assets() {
  const { createAsset } = useContext(SubstrateContext);
  const [asset, setasset] = useState({ objectId: '', assetId: '' });
  const onChange = (e) => {
    setasset({ ...asset, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={styles.form}>
        <div className={styles.input}>
          <span>ObjectID</span>
          <input
            type='text'
            name='objectId'
            value={asset.objectId}
            onChange={onChange}
          />
        </div>
        <div className={styles.input}>
          <span>AssetID</span>
          <input
            type='text'
            name='assetId'
            value={asset.assetId}
            onChange={onChange}
          />
        </div>
        <button onClick={() => createAsset(asset.objectId, asset.assetId)}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Assets;
