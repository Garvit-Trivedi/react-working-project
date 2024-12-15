import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Meals from './Meals.jsx';
import Bank from './Banks.jsx';
import Cocktails from './Cocktails.jsx';
import Potter from './Potter.jsx';
// import Navbar from './components/Navbar.jsx';
import NavigationLinks from './components/NavigationLinks.jsx';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="content">
        <NavigationLinks />
        <Routes>
          <Route path="/meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/potter" element={<Potter />} />
          <Route path="/banks" element={<Bank />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
