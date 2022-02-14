import React, { useState} from 'react';
import './App.css';

import { Routes, Route, Link } from "react-router-dom";
import Basic from "./pages/basic/basic";
import WithStyles from "./pages/with-styles/with-styles";


function App() {
  const [token, setToken] = useState('');
  const [filter, setFilter] = useState({});

  const submitAuthentication = async () => {
      fetch('https://auth.qa.railz.ai/getAccess', {
          "method": "GET",
          "headers": {'Authorization': `Basic ${'ID_QA_65B22F09BA954E69B1CD412A1649DC84'}:${'id_qa_pbvbEYNeaNSk7rBKaNpcYv10TicGAwkY4yfp9lNBDrUkDbcI'}`}
      })
          .then((response: any) => {
              setToken(response.access_token);
          })
          .catch(err => {
              console.error(err);
          });
  }

  return (
      <Routes>
          <Route path="/" element={<Basic />} />
          <Route path="/customization" element={<WithStyles />} />
      </Routes>
  );
}

export default App;
