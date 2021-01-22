import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ManageMentDashboard from './Component/ManageMentDashboard/ManageMentDashboard';
import LoginPage from './LoginPage/LoginPage';
import TeacherDashboard from './Component/TeacherDashboard/TeacherDashboard';
import StudentDashboard from './Component/StudentDashboard/StudentDashboard';
import SadminDashboard from './Component/SadminDashboard/SadminDashboard'
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Profile from './ProfilePage/Profile';
import PrincipalDashboard from './Component/PrincipalDashboard/PrincipalDashboard';
import ParentsDashboard from './Component/ParentsDashboard/ParentsDashboard';

function App() {
  return (
    <div className="App">


      {/** 
              

 

 */}



      <Router>

        <Switch>
          <Route exact path="/admin" component={ManageMentDashboard} />
          <Route exact path="/sadmin" component={SadminDashboard} />
          <Route exact path="/teacher" component={TeacherDashboard} />
          <Route exact path="/student" component={StudentDashboard} />
          <Route exact path="/principal" component={PrincipalDashboard} />
          <Route exact path="/parents" component={ParentsDashboard} />
          <Route exact path="/forgot" component={ForgotPassword} />

          <Route exact path="/" component={LoginPage} />


        </Switch>

      </Router>

    </div>
  );
}

export default App;
