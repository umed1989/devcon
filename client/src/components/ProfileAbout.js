import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProfileAbout = ({profile: {bio, skills, user: {name}}}) => {
    return (
        <Fragment>
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{name}</h2>
                <p>
                    {bio}
                </p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {skills.map((index, skill) => (
                        <div className="p-1" key={index}>
                            <i className="fa fa-check"></i> {skill}
                        </div>
                    ))}
                </div>
        </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {

}

export default connect()(ProfileAbout)