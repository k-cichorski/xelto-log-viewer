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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

function SearchModule() {
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [inputUserValue, setInputUserValue] = useState('');
  const [inputStatusValue, setInputStatusValue] = useState('');
  const[, dispatch] = useStateValue();
  const mobileDevice = useMediaQuery('(max-width:1224px)');
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

  const updateResults = (results) => {
    dispatch({type: fillResults, payload: results});
  }

  const clearResults = () => {
    dispatch({type: fillResults, payload: null});
    dispatch({type: selectResult, selected: null});
  }

  const requestTimeout = async (time, promise) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Oczekiwanie na odpowiedź serwera trwało zbyt długo. Spróbuj zawęzić kryteria wyszukiwania.'));
      }, time);
      promise.then(resolve, reject);
    })
  }

  const handleSubmit = async e => {
      e.preventDefault();
      toggleLoading();
      clearResults();
      try {
        const API = `${process.env.REACT_APP_SERVER_HOST}/api/v1/getData`;
        let data = {
          dateFrom: selectedDateFrom,
          dateTo: selectedDateTo,
          user: inputUserValue,
          status: inputStatusValue
        }
        var controller = new AbortController();
        const signal = controller.signal;
        let response = await requestTimeout(process.env.REACT_APP_FETCH_TIMEOUT, fetch(API, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: signal
        })); 
        if (response === null) {
          alert('Brak wyników wyszukiwania!');
          clearResults();
          toggleLoading();
          return
        } else {
            if (response.ok) {
              response = await response.json();
              let results = normalizeResults(response);
              toggleLoading();
              updateResults(results);
            } else {
                response = await response.json();
                toggleLoading();
                alert(response);
                return
            }
        }
      } catch(err) {
        toggleLoading();
        controller.abort();
        err.message === 'Failed to fetch'? alert('Błąd połączenia z serwerem.'):alert(err.message);
      }
      
  }

  const clearInputs = () => {
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
    setInputUserValue('');
    setInputStatusValue('');
  }

  return (
    mobileDevice? (
      <ThemeProvider theme={datePickerTheme}>
      <div className='searchModule'>
        <form className='searchModule__form'>

          <Button variant='contained' onClick={() => clearInputs()}>Wyczyść</Button>

          <div className="form__elementsContainer">

            <div className="form__elementsContainer">
                <KeyboardDatePicker variant='inline' label='Data od:' autoOk={true}
                                    format="DD/MM/yyyy" inputVariant='outlined'
                                    value={selectedDateFrom}
                                    onChange={setSelectedDateFrom}
                                    InputLabelProps={{shrink: true}}
                                    invalidDateMessage='Wpisz poprawną datę'/>

                <TextField variant='outlined' label='Użytkownik'
                       InputLabelProps={{shrink: true}} onChange={e => setInputUserValue(e.target.value)}
                       value={inputUserValue}/>
            </div>

          </div>

          <div className="form__elementsContainer">
            <KeyboardDatePicker variant='inline' label='Data do:' autoOk={true}
                                format="DD/MM/yyyy" inputVariant='outlined'
                                value={selectedDateTo}
                                onChange={setSelectedDateTo}
                                InputLabelProps={{shrink: true}}
                                invalidDateMessage='Wpisz poprawną datę'/>
            
            <TextField variant='outlined' label='Status'
                       InputLabelProps={{shrink: true}} onChange={e => setInputStatusValue(e.target.value)}
                       value={inputStatusValue}/>

          </div>

          <IconButton className='form__searchButton' onClick={e => handleSubmit(e)}>
              <input type='submit' style={{display: 'none'}}/>
              <SearchIcon/>
            </IconButton>  
            
        </form>
      </div>
      
      </ThemeProvider>
    ) :
    (
      <div className='searchModule'>
        <form className='searchModule__form'>

            <Button variant='contained' onClick={() => clearInputs()}>Wyczyść</Button>

            <ThemeProvider theme={datePickerTheme}>
              <KeyboardDatePicker variant='inline' label='Data od:' autoOk={true}
                                  format="DD/MM/yyyy" inputVariant='outlined'
                                  value={selectedDateFrom}
                                  onChange={setSelectedDateFrom}
                                  InputLabelProps={{shrink: true}}
                                  invalidDateMessage='Wpisz poprawną datę'/>

              <KeyboardDatePicker variant='inline' label='Data do:' autoOk={true}
                                  format="DD/MM/yyyy" inputVariant='outlined'
                                  value={selectedDateTo}
                                  onChange={setSelectedDateTo}
                                  InputLabelProps={{shrink: true}}
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
            
        </form>
      </div>
    )
  )
}

export default SearchModule

