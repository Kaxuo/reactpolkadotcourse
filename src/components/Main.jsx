import { useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import './Main.scss';
import { useContext } from 'react';
import { UserContext } from '../substrate-lib/SubstrateContext';

function Main() {
  const { todos, handleSubmit, name, setname, dispatch } =
    useContext(UserContext);
  // const randomAccount = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  // const own = '5CLr3qYnSLNkfDzoZKXYt7DDaZrYWe8AMpN4bVnYEHxyBBBD';
  useEffect(async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    let users = await api.query.system.account.entries();
    console.log(users);
  }, []);

  return (
    <>
      <h1 className='title'>Hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </form>

      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h1>{todo.name}</h1>
            <button
              onClick={() =>
                dispatch({ type: 'delete-todo', payload: { id: todo.id } })
              }
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Main;
