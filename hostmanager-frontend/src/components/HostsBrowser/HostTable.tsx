import { TextField } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Host, VALIDATE_OUTPUT } from '../../models/host';
import PopupDialog from '../PopupDialog';
import PopupField from '../PopupField';
import { ProtocolResult, ProtocolResultMapByHostId } from '../../state/reducers/localState';
import DoneIcon from '@material-ui/icons/Done';
import { green, red } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { AppState } from '../../state/reducers';

type HostTableEntity = {
  id: number;
  name: string;
  address: string;
  enabled: boolean;
  protocols: number[];
  dir: boolean;
}

function nameComparator(a: HostTableEntity, b: HostTableEntity) {
  const compareDirs = (a: HostTableEntity, b: HostTableEntity) => {
    if (a.dir && b.dir) {
      return generalCompare(a, b);
    }
    return (a.dir) ? -1 : 1;
  }
  const compareHosts = (a: HostTableEntity, b: HostTableEntity) => {
    return generalCompare(a, b);
  }
  const generalCompare = (a: HostTableEntity, b: HostTableEntity) => {
    return a.name.localeCompare(b.name);
  }

  if (a.dir || b.dir) {
    return compareDirs(a, b);
  }
  return compareHosts(a, b);
}

function ipStringToBin(ip: string): string {
  let octets = ip.split('.').map(oct => +oct);
  return (octets[0]).toString(2) + (octets[1] << 16).toString(2) + (octets[2] << 8).toString(2) + (octets[3]).toString(2);
}

function isStringIp(str: string): boolean {
  let octets = str.split('.');
  if (octets.length != 4) {
    return false;
  }

  let isIp = true;
  octets.forEach(part => {
    if (Number.isNaN(+part)) {
      isIp = false;
    }
    if (+part < 0 || +part > 255) {
      isIp = false;
    }
  });
  return isIp;
}

function addressComparator(a: HostTableEntity, b: HostTableEntity) {
  if (! isStringIp(a.address)) {
    return -1
  };
  if (! isStringIp(b.address)) {
    return 1;
  }

  let octetsA = a.address.split('.').map(oct => +oct);
  let octetsB = b.address.split('.').map(oct => +oct);
  if (octetsA[0] != octetsB[0]) return octetsA[0] - octetsB[0];
  if (octetsA[1] != octetsB[1]) return octetsA[1] - octetsB[1];
  if (octetsA[2] != octetsB[2]) return octetsA[2] - octetsB[2];
  return octetsA[3] - octetsB[3];
}

function protocolsComparator(a: HostTableEntity, b: HostTableEntity) {

}

function descendingComparator(a: HostTableEntity, b: HostTableEntity, orderBy: keyof HostTableEntity): number {
  if (orderBy === 'name') {
    return nameComparator(a, b);
  }
  if (orderBy === 'address') {
    return addressComparator(a, b);
  }
  return a.name.localeCompare(b.name);
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof HostTableEntity>(
  order: Order, 
  orderBy: Key
  ): (a: HostTableEntity, b: HostTableEntity) => number {
    return order === 'desc' 
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof HostTableEntity;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
  // { id: 'protocols', numeric: true, disablePadding: false, label: 'Protocols' }
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HostTableEntity) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof HostTableEntity) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >

              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  additionalButtons: typeof Tooltip;
  tableTitle: string
  onSearchClicked: () => void;
  showResetSearchButton: boolean;
  onResetSearchButton: () => void;
  onAddClicked: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const SearchButton = () => {
    return (props.showResetSearchButton) ? 
      (<Tooltip title="Find in list">
        <IconButton onClick={() => props.onSearchClicked()} aria-label="find in list">
          <ClearIcon />
        </IconButton>
      </Tooltip>)
    : (<Tooltip title="Reset search">
          <IconButton onClick={() => props.onResetSearchButton()} aria-label="reset search">
            <SearchIcon />
          </IconButton>
        </Tooltip>)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {props.tableTitle}
          </Typography>
        )}
      {numSelected > 0 ? (
        <ButtonGroup variant="text" color="primary" aria-label="outlined primary button group">
          <Tooltip title="Edit">
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add new object here">
            <IconButton onClick={() => props.onAddClicked()} aria-label="filter list">
              <AddIcon />
            </IconButton>
          </Tooltip>
          {
            props.additionalButtons
          }
          {
            (props.showResetSearchButton) ? 
            (<Tooltip title="Reset search">
              <IconButton onClick={() => {props.onResetSearchButton()}} aria-label="find in list">
                <ClearIcon />
              </IconButton>
            </Tooltip>)
          : (<Tooltip title="Find in list">
                <IconButton onClick={() => {props.onSearchClicked()}} aria-label="reset search">
                  <SearchIcon />
                </IconButton>
              </Tooltip>)
          }
        </ButtonGroup>
        )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex'
    },
    paper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
      // marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 500,
      // overflowY: 'auto',
    },
    tableRow: {
      height: 100

    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);


const validateOutput = (output: string, regex: string): boolean => {
  let exp = new RegExp(regex);
  return exp.test(output);
}

const validateExitcode = (receivedExitcode: number, expectedExitcode: number): boolean => {
  return receivedExitcode === expectedExitcode;
}

const initialState = {
  mouseX: null,
  mouseY: null,
  selectedItem: null
};

export default function EnhancedTable(props: { 
  data: Host[], 
  protocolResults: ProtocolResultMapByHostId,
  additionalButtons: typeof Tooltip,
  onRowClicked: any, 
  tableTitle: string, 
  parentId: number, 
  onEntryDelete: (row: HostTableEntity) => void
}) {
  const protocolsState = useSelector((appState: AppState) => appState.protocols.data);
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof HostTableEntity>('name');
  const [selected, setSelected] = React.useState<string[]>([]);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(true);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchPopupState, setSearchPopupState] = React.useState<boolean>(false);

  let history = useHistory();

  let { data, onRowClicked } = props;

  const [state, setState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
    selectedItem: null | HostTableEntity;
  }>(initialState);

  const [deletePopupState, setDeletePopupState] = React.useState<
    {showDelete: boolean, target: HostTableEntity | null}>({showDelete: false, target: null});

  const handleClickMenu = (event: React.MouseEvent<HTMLDivElement>, row: HostTableEntity) => {
    event.preventDefault();
    console.log(row);
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      selectedItem: row
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof HostTableEntity) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  const preparedData = (searchQuery === '') 
  ? (data as HostTableEntity[])
  : (data as HostTableEntity[]).filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    // <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          additionalButtons={props.additionalButtons}
          onSearchClicked={() => {setSearchPopupState(true)}}
          onAddClicked={() => {history.push(`/objects/new/${props.parentId}`)}}
          onResetSearchButton={() => {setSearchQuery('')}}
          showResetSearchButton={searchQuery !== ''}
          tableTitle={searchQuery !== '' ? ('Search: ' + searchQuery) : 'Hosts'} 
          numSelected={selected.length} 
        />  
        <TableContainer >
          <Table
            // stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
            />
            <TableBody >
              {stableSort(preparedData, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // console.log(row.id);
                  // console.log(Object.keys(props.protocolResults).includes([row.id]));
                  const protocolResults = props.protocolResults[row.id];
                  let validationOk = false;
                  let protocolResult: ProtocolResult | null = null;
                  if (protocolResults !== undefined) {
                    protocolResult = protocolResults[VALIDATE_OUTPUT];
                    if (protocolResult !== undefined) {
                      validationOk = validateOutput(protocolResult.stderr+protocolResult.stdout, protocolResult.protocol.validationRegex);
                    }
                  }                  
                  const colorAvail = validationOk ? {color: green[500]} : {color: red[500]};
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const clickHandler = (e: any) => {onRowClicked(row)};

                  const color = row.enabled ? {} : {color: '#C0C0BC'} 
                  return (
                    <TableRow 
                      style={{ width: "10%", height: "20px", padding: "0px" }}
                      hover
                      onContextMenu={(e) => handleClickMenu(e, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id + ''}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.name)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell onClick={clickHandler} 
                        style={{ height: "20px", width: '70%', ...color }}
                        component="th" id={labelId} scope="row" padding="none">
                        {protocolResults !== undefined ? <Tooltip title={`${protocolResult?.protocol.name} executedd at ${protocolResult?.createdAt}`} placement="right"><DoneIcon style={colorAvail} /></Tooltip> : ''}
                        {row.name}
                      </TableCell>
                      <TableCell onClick={clickHandler} 
                      style={{ height: "20px", width: '20%', ...color  }} 
                      align="left">{row.address ? row.address : " "}</TableCell>
                      {/* <TableCell onClick={clickHandler} 
                      style={{ height: "20px", width: '10%', ...color  }} 
                      align="right">{row.dir ? " " : "rms"}</TableCell> */}
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          keepMounted
          open={state.mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            state.mouseY !== null && state.mouseX !== null
              ? { top: state.mouseY, left: state.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={() => {
            handleClose();
            history.push(`/objects/edit/${state.selectedItem?.id}`);
          }}>Edit</MenuItem>
          {state.selectedItem?.dir ? <MenuItem onClick={() => {
            handleClose();
            history.push(`/objects/new/${state.selectedItem?.id}`);
          }}>New item</MenuItem> : <div></div>}
          <MenuItem onClick={() => {
            handleClose();
            setDeletePopupState({showDelete: true, target: state.selectedItem})
          }}>Delete</MenuItem>
          <Divider />
          {
            state.selectedItem?.protocols.map(protoId => {
              let found = protocolsState.find(p => p.id === protoId);

              return (<MenuItem onClick={handleClose}>{found?.name}</MenuItem>);
            })
          }
        </Menu>
        <PopupDialog 
          open={deletePopupState.showDelete}
          title={`Delete item`}
          body={`Delete ${deletePopupState.target?.name}`}
          onYes={() => {
            if (deletePopupState.target) {
              props.onEntryDelete(deletePopupState.target)
            }
            setDeletePopupState({showDelete: false, target: null});
          }}
          onNo={() => {
            setDeletePopupState({showDelete: false, target: null});
          }}
          />
        <PopupField 
          open={searchPopupState}
          title={'Find'}
          body={''}
          onYes={(query: string) => {setSearchQuery(query), setSearchPopupState(false)}}
          onNo={() => {setSearchPopupState(false)}}
        />
      </Paper>
    // </div>
  );
}
