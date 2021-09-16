import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import { useContext } from 'react';

function Status() {
  const { status } = useContext(SubstrateContext);
  return (
    <>
      <p style={{ textAlign: 'center' }}>{status}</p>
    </>
  );
}

export default Status;
