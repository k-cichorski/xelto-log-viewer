import React, {useState} from 'react';
import '../css/SearchModule.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {ThemeProvider} from '@material-ui/styles';
import datePickerTheme from '../css/datePickerTheme';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';
import { useStateValue } from '../store/StateProvider';
import {fillResults, toggleLoadingAnimation, selectResult} from '../store/reducer';
import moment from 'moment';

function SearchModule() {
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const [inputUserValue, setInputUserValue] = useState('');
  const [inputStatusValue, setInputStatusValue] = useState('');
  const[, dispatch] = useStateValue();

  const normalizeResults = results => {
    let normalized = [...results];
	  normalized.forEach(row => {
			for (let key in row) {
				if (typeof row[key] === 'string') {
          row[key] = row[key].trim();
				}
				if (key === 'StartTime' || key === 'EndTime' || key === 'AuditDate') {
					let date = moment(row[key]);
					row[key] = `${date.utc().format('HH:mm:ss')} ${date.utc().format('DD-MM-YYYY')} UTC`;
				}
			}
    })
    return normalized
	}

  const handleSubmit = async e => {
      e.preventDefault();
      dispatch({type: toggleLoadingAnimation});
      dispatch({type: selectResult, payload: null});
      try {
        let response = await fetch('http://localhost:9000/');
        response = await response.json();
        let results = normalizeResults(response);
        let action = {
          type: fillResults,
          payload: results
        }
        dispatch({type: toggleLoadingAnimation});
        dispatch(action);
      } catch(err) {alert(err);}
      
  }

  return (
      <div className='searchModule'>
        <form className='searchModule__form'>

            <ThemeProvider theme={datePickerTheme}>
              <KeyboardDatePicker variant='inline' label='Data od:' autoOk={true}
                                  format="DD/MM/yyyy" inputVariant='outlined'
                                  value={selectedDateFrom}
                                  onChange={setSelectedDateFrom}
                                  invalidDateMessage='Wpisz poprawną datę'/>

              <KeyboardDatePicker variant='inline' label='Data do:' autoOk={true}
                                  format="DD/MM/yyyy" inputVariant='outlined'
                                  value={selectedDateTo}
                                  onChange={setSelectedDateTo}
                                  invalidDateMessage='Wpisz poprawną datę'/>
            </ThemeProvider>

            <TextField variant='outlined' label='Użytkownik'
                       InputLabelProps={{shrink: true}} onChange={e => setInputUserValue(e.target.value)}/>
            <TextField variant='outlined' label='Status'
                       InputLabelProps={{shrink: true}} onChange={e => setInputStatusValue(e.target.value)}/>

            <IconButton className='form__searchButton' onClick={e => handleSubmit(e)}>
              <input type='submit' style={{display: 'none'}}/>
              <SearchIcon/>
            </IconButton>

        </form>
      </div>
  )
}

export default SearchModule

