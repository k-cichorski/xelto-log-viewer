import React from 'react';
import './App.css';
import SearchModule from './components/SearchModule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ResultsModule from './components/ResultsModule';
import DisplayXML from './components/XmlDisplay';
import { useStateValue } from './store/StateProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [{searchResults, selectedResult, loadingData}] = useStateValue();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className='app'>
        <div className='app__container'>
          <SearchModule/>

          {loadingData?
            <CircularProgress className='loading__animation'/>
            :searchResults &&
            <ResultsModule props={{searchResults}} />

          }

          {
            selectedResult && 
              <DisplayXML props={{selectedResult}} />
          }
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
  
}

export default App;
