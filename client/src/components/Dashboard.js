import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education'
// import AddEducation from './AddEducation';
// import AddExperience from './AddExperience'
import PropTypes from 'prop-types';
import {deleteAccount, getProfile} from '../actions/actions'
import {connect} from 'react-redux'
import { Fragment } from 'react';

const Dashboard = ({getProfile, deleteAccount, auth: {user}, profile}) => {
    useEffect(() => {
        getProfile()
      }, [getProfile])

      return (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions/>
              <Experience experience = {profile.experience}/>
              <Education education = {profile.education}/>
              <div className="my-2">
                <button className="btn btn-danger" onClick = {() => deleteAccount()}>
                  <i className="fas fa-user-minus" /> Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      );
    };

Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})


export default connect(mapStateToProps, {getProfile, deleteAccount})(Dashboard)