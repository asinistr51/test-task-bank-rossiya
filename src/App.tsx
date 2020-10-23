import React from 'react';
import './styles/App.css';
import Paper from '@material-ui/core/Paper';
import { Navbar } from './components/Navbar';
import { CalculatorPref } from './components/CalculatorPref';
import db from './depcalc.json'

function App() {
  return (
    <>
      <Navbar />
      <Paper className="container" elevation={3}>
        <CalculatorPref properties={JSON.parse(JSON.stringify(db))}/>
      </Paper>
    </>
  );
}

export default App;
