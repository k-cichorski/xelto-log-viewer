import React, {useState} from 'react';
import '../css/SearchModule.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {ThemeProvider} from '@material-ui/styles';
import datePickerTheme from '../css/datePickerTheme';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';

function SearchModule() {
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const [inputUserValue, setInputUserValue] = useState('');
  const [inputStatusValue, setInputStatusValue] = useState('');

  const handleSubmit = e => {
      e.preventDefault();
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

            <TextField variant='outlined' label='Użytkownik' onChange={e => setInputUserValue(e.target.value)}/>
            <TextField variant='outlined' label='Status' onChange={e => setInputStatusValue(e.target.value)}/>

            <IconButton className='form__searchButton' onClick={e => handleSubmit(e)}>
              <input type='submit' style={{display: 'none'}}/>
              <SearchIcon/>
            </IconButton>

        </form>
      </div>
  )
}

export default SearchModule

