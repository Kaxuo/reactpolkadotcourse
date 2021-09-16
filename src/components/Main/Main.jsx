import { useContext, useEffect } from 'react';
import { SubstrateContext } from './../../substrate-lib/BlockChainContext';
import styles from './Main.module.scss';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Main() {
  const { accounts, balance, connection } = useContext(SubstrateContext);
  useEffect(() => {
    connection();
  }, []);
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const createData = (name, address, balance) => {
    return { name, address, balance };
  };

  const rows = [];
  accounts.map((account) => {
    let acc = { ...account, balance: balance[account.address] };
    rows.push(createData(acc.meta.name, acc.address, acc.balance));
  });
  const ellipsis = (string) =>
    string.length > 5 &&
    `${string.substring(0, 8)} ... ${string.substr(string.length - 10)}`;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Copy</StyledTableCell>
              <StyledTableCell align='right'>Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.address}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  <span className={styles.big}>{row.address}</span>
                  <span className={styles.small}> {ellipsis(row.address)}</span>
                </StyledTableCell>
                <StyledTableCell>
                  <CopyToClipboard text={row.address}>
                    <span className={styles.copy}>
                      <FileCopyOutlinedIcon />
                    </span>
                  </CopyToClipboard>
                </StyledTableCell>
                <StyledTableCell align='right'>{row.balance}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Main;
