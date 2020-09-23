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
	const {header, xmlString} = props;
	return (
			<div className='xmlDisplay'>
					<TableContainer component={Paper} className='xmlDisplay__tableContainer'>
							<Table stickyHeader className='xmlDisplay__table'>
									<TableHead>
											<TableRow>
													<TableCell align='center'>{header}</TableCell>
											</TableRow>
									</TableHead>

									<TableBody>
										<TableRow>
											<TableCell align='center' className='table__xmlCell'>{xmlString}</TableCell>
										</TableRow>
									</TableBody>
							</Table>
					</TableContainer>
			</div>
	)
}

export default DisplayXML
