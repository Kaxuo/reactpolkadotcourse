//Subscribe to the change of the balance of an account //
// const unsub = await api.query.system.account(
//   randomAccount,
//   ({ nonce, data: balance }) => {
//     console.log(
//       `free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
//     );
//   }
// );

// now and account balance
// const [now, { nonce, data: balance }] = await Promise.all([
//   api.query.timestamp.now(),
//   api.query.system.account(randomAccount),
// ]);
// console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

// await api.rpc.chain.subscribeNewHeads((lastHeader) => {
//     setnumber(`${lastHeader.number}`);
//     console.log(
//       `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`
//     );
//   });