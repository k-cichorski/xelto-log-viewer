import React, {useState} from 'react';
import '../css/SearchModule.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {ThemeProvider} from '@material-ui/styles';
import datePickerTheme from '../css/datePickerTheme';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';
import { useStateValue } from '../store/StateProvider';
import Button from '@material-ui/core/Button';
import {fillResults, toggleLoadingAnimation, selectResult} from '../store/reducer';
import moment from 'moment';

function SearchModule() {
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
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
  
  const toggleLoading = () => {
    dispatch({type: toggleLoadingAnimation});
  }

  const handleSubmit = async e => {
      const API = 'http://localhost:9000/api/v1/getData';
      e.preventDefault();
      toggleLoading();
      dispatch({type: selectResult, payload: null});
      try {
        if(selectedDateFrom === null && selectedDateTo === null && inputUserValue === '' && inputStatusValue ==='')
        {
          alert('Nie mogę wykonać pustego zapytania!');
          toggleLoading();
          return
        }
        let data = {
          dateFrom: selectedDateFrom,
          dateTo: selectedDateTo,
          user: inputUserValue,
          status: inputStatusValue
        }
        let response = await fetch(API, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        response = await response.json();
        if (response === null) {
          alert('Brak wyników wyszukiwania!');
          dispatch({type: fillResults, payload: null});
          toggleLoading();
          return
        }
        let results = normalizeResults(response);
        let action = {
          type: fillResults,
          payload: results
        }
        toggleLoading();
        dispatch(action);
      } catch(err) {
        toggleLoading();
        alert(err);
      }
      
  }

  const clearInputs = () => {
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
    setInputUserValue('');
    setInputStatusValue('');
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
                       InputLabelProps={{shrink: true}} onChange={e => setInputUserValue(e.target.value)}
                       value={inputUserValue}/>
            <TextField variant='outlined' label='Status'
                       InputLabelProps={{shrink: true}} onChange={e => setInputStatusValue(e.target.value)}
                       value={inputStatusValue}/>

            <IconButton className='form__searchButton' onClick={e => handleSubmit(e)}>
              <input type='submit' style={{display: 'none'}}/>
              <SearchIcon/>
            </IconButton>
            
            <Button variant='contained' onClick={() => clearInputs()}>Wyczyść</Button>

        </form>
      </div>
  )
}

export default SearchModule

