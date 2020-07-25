import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './Routes';
import './index.css'

function App() {
    const [abc, setAbc] = React.useState('');

    const handle = (e)=>{
        console.log("e", e.target.value);
        setAbc(e.target.value);
    };
  return (
      <BrowserRouter>
          <select className="abc" onChange={handle} value={abc}>
              <option value={"abc"}>abc</option>
              <option value={"def"}>def</option></select>
          <Routes/>
      </BrowserRouter>
  );
}

export default App;
