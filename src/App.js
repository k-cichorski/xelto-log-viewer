import React from 'react';
import './App.css';
import SearchModule from './components/SearchModule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ResultsModule from './components/ResultsModule';
import DisplayXML from './components/XmlDisplay';

function App() {
  

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className='app'>
        <div className='app__container'>
          <SearchModule/>
          <ResultsModule/>

          <div className='xmlDisplay__container'>
            <DisplayXML props={{header: 'INPUT XML',
                                xmlString: ''}}/>
            <DisplayXML props={{header: 'OUTPUT XML',
                                xmlString: ''}}/>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
  
}

export default App;
