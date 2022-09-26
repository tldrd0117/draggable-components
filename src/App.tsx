import React from 'react';
import './App.css';
import Draggable from './components/Draggable';
import Box from './components/Box';

function App() {
  return (
    <div className="App">
      <p style={{fontWeight:"bold"}}>draggable-components</p>
      <div className={"Center"}>
        <Draggable
          width={500}
          height={500}>
          <Box 
            width={100} 
            height={100}
            color={"white"}
            backgroundColor="black"/>

        </Draggable>
      </div>
    </div>
  );
}

export default App;
