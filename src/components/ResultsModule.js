import React from 'react';
import '../css/ResultsModule.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStateValue } from '../store/StateProvider';
import {selectResult} from '../store/reducer';

function ResultsModule({props}) {
	let {searchResults} = props;
	const [, dispatch] = useStateValue();
	
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
								{searchResults?.map(row => (
									<TableRow key={row.Id} onClick={() => handleRowClik(row.Id)}>
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
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<p>Wyniki: {searchResults?.length}</p>
				
			</div>
	)
}

export default ResultsModule
