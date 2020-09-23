import React from 'react';
import './App.css';
import SearchModule from './components/SearchModule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ResultsModule from './components/ResultsModule';

function App() {
  

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className='app'>
        <div className='app__container'>
          <SearchModule/>
          <ResultsModule/>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
  
}

export default App;
