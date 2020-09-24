import React, {useState} from 'react';
import '../css/ResultsModule.css';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';
import { useStateValue } from '../store/StateProvider';
import {selectResult} from '../store/reducer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, plPL);

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="pierwsza strona"
      >
      	<FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ResultsModule({props}) {
	let {searchResults} = props;
	const [{selectedResult}, dispatch] = useStateValue();
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, searchResults.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
	
	const handleRowClik = id => {
			let action = {
				type: selectResult,
				payload: id
			}
			dispatch(action);
	}

	return (
			<div className='results'>
				<div className='results__container'>
					<TableContainer component={Paper}>
						<Table stickyHeader className='results__table'>
							<TableHead>
								<TableRow>
									<TableCell align='center'>Użytkownik</TableCell>
									<TableCell align='center'>Domena</TableCell>
									<TableCell align='center'>Magazyn</TableCell>
									<TableCell align='center'>Operation Name</TableCell>
									<TableCell align='center'>Operation Status</TableCell>
									<TableCell align='center'>Operation Category</TableCell>
									<TableCell align='center'>Exception Type</TableCell>
									<TableCell align='center'>Exception Message</TableCell>
									<TableCell align='center'>Start Time</TableCell>
									<TableCell align='center'>End Time</TableCell>
									<TableCell align='center'>Duration Time</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{ rowsPerPage > 0
								? searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
									<TableRow key={row.Id} onClick={() => handleRowClik(row.Id)}
														className={selectedResult?.Id === row.Id&&'results__tableSelectedRow'}>
										<TableCell align='center' component='th' scope='row'>{row.MobileUserId}</TableCell>
										<TableCell align='center'>{row.MobileDomain}</TableCell>
										<TableCell align='center'>{row.Branch}</TableCell>
										<TableCell align='center'>{row.OperationName}</TableCell>
										<TableCell align='center'>{row.Status}</TableCell>
										<TableCell align='center'>{row.Category}</TableCell>
										<TableCell align='center'>{row.ExceptionType}</TableCell>
										<TableCell align='center'>{row.ExceptionMessage}</TableCell>
										<TableCell align='center'>{row.StartTime}</TableCell>
										<TableCell align='center'>{row.EndTime}</TableCell>
										<TableCell align='center'>{row.Duration}</TableCell>
									</TableRow>
								))
									:
									searchResults.map(row => (
										<TableRow key={row.Id} onClick={() => handleRowClik(row.Id)}
															className={selectedResult?.Id === row.Id&&'results__tableSelectedRow'}>
											<TableCell align='center' component='th' scope='row'>{row.MobileUserId}</TableCell>
											<TableCell align='center'>{row.MobileDomain}</TableCell>
											<TableCell align='center'>{row.Branch}</TableCell>
											<TableCell align='center'>{row.OperationName}</TableCell>
											<TableCell align='center'>{row.Status}</TableCell>
											<TableCell align='center'>{row.Category}</TableCell>
											<TableCell align='center'>{row.ExceptionType}</TableCell>
											<TableCell align='center'>{row.ExceptionMessage}</TableCell>
											<TableCell align='center'>{row.StartTime}</TableCell>
											<TableCell align='center'>{row.EndTime}</TableCell>
											<TableCell align='center'>{row.Duration}</TableCell>
										</TableRow>
									))
								}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>

							
						</Table>
					</TableContainer>
				</div>
				<div className='footer__container'>
				<ThemeProvider theme={theme}>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 25, { label: 'Wszystkie', value: -1 }]}
											count={searchResults.length}
											rowsPerPage={rowsPerPage}
											page={page}
											SelectProps={{
												inputProps: { 'aria-label': 'rows per page' },
												native: true,
											}}
											onChangePage={handleChangePage}
											onChangeRowsPerPage={handleChangeRowsPerPage}
											ActionsComponent={TablePaginationActions}
										/>
									</TableRow>
								</TableFooter>
							</ThemeProvider>
							</div>
			</div>
	)
}

export default ResultsModule
