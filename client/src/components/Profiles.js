import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import Spinner from './Spinner'
import ProfileItem from './ProfileItem'
import {getProfiles} from '../actions/actions'
import {connect} from 'react-redux'

 const Profiles = ({profile: {loading, profiles}, getProfiles}) => {
     useEffect(() => {
         getProfiles();
     }, [getProfiles])

    return (
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className='large text-primary'>Developers</h1>
              <p className='lead'>
                <i className='fab fa-connectdevelop' /> Browse and connect with
                developers
              </p>
              <div className='profiles'>
                {profiles.length > 0 ? (
                  profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No profiles found...</h4>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      );
    };


Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)