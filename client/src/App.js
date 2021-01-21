import {Fragment, useEffect} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert'
import Landing from './components/Landing';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Post from './components/Post';
import Profiles from './components/Profiles';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import AddExperience from './components/AddExperience';
import AddEducation from './components/AddEducation';
import Login from './components/Login';
import CreateProfile from './components/CreateProfile'
import PrivateRoute from './components/PrivateRoute'
import {loadUser} from './actions/actions';
import {setAuthToken} from '../src/utils/setAuthToken'
import './App.css'
import store from './store';


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [loadUser])

  return (
    <Provider store={store}>
      <Router>
        <Fragment >
          <Navbar/>
          {/* <Alert/> */}
          <Route exact path = '/' component={Landing}/>
          <section className='container'>
            <Switch>
              {/* <Alert/> */}
              <Route exact path ='/login' component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <PrivateRoute exact path = '/dashboard' component = {Dashboard}/>
              <PrivateRoute exact path = '/create-profile' component = {CreateProfile}/>
              <PrivateRoute exact path = '/edit-profile' component = {EditProfile}/> 
              <PrivateRoute exact path = '/add-experience' component = {AddExperience}/> 
              <PrivateRoute exact path = '/add-education' component = {AddEducation}/> 
              <PrivateRoute exact path="/posts" component={Posts}/> 
              <PrivateRoute exact path="/posts/:id" component={Post}/> 
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
