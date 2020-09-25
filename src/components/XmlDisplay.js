import React from 'react';
import '../css/XmlDisplay.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const DisplayXML = ({props}) => {
	const {selectedResult} = props;
	return (
		<>
			{/* IDs below are not the same as ones in the database, db query returns them as indexes of result items*/}
			<p>ID rekordu: {selectedResult.Id}</p>
			<div className='xmlDisplay__container'>
				<div className='xmlDisplay'>
						<TableContainer component={Paper} className='xmlDisplay__tableContainer'>
								<Table stickyHeader className='xmlDisplay__table'>
										<TableHead>
												<TableRow>
														<TableCell align='center'>INPUT XML</TableCell>
												</TableRow>
										</TableHead>

										<TableBody>
											<TableRow>
												<TableCell align='center' className='table__xmlCell'>{selectedResult.Inputs}</TableCell>
											</TableRow>
										</TableBody>
								</Table>
						</TableContainer>
				</div>

				<div className='xmlDisplay'>
				<TableContainer component={Paper} className='xmlDisplay__tableContainer'>
						<Table stickyHeader className='xmlDisplay__table'>
								<TableHead>
										<TableRow>
												<TableCell align='center'>OUTPUT XML</TableCell>
										</TableRow>
								</TableHead>

								<TableBody>
									<TableRow>
										<TableCell align='center' className='table__xmlCell'>{selectedResult.Output && selectedResult.Output}</TableCell>
									</TableRow>
								</TableBody>
						</Table>
				</TableContainer>
				</div>
			</div>
			</>
	)
}

export default DisplayXML
