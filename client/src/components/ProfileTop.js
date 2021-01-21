import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProfileTop = ({profile: {status, company, location}, user: {name, avatar}}) => {
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead">{status} at {company}</p>
                <p>{location}</p>
                <div className="icons my-1">
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i> 
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </Link>
                </div>
        </div>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    profile: state.profile,
    user: state.user
})

ProfileTop.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(ProfileTop)

