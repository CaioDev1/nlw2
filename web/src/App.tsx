import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing} />
      <Route exact path='/teacherlist' component={TeacherList} />
      <Route exact path='/teacherform' component={TeacherForm} />
    </Router>
  );
}

export default App;
