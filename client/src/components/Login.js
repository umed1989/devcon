import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, setAlert} from '../actions/actions';
import { SET_ALERT } from '../actions/actionTypes';

 const Login = ({login, auth}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''    
    })

    const { email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const formSubmit = async e => {
        try {
            e.preventDefault();
            login(email, password)
        }
         catch(err) {
            console.log(err.message)
        }
    }

    if(auth) {
        return  <Redirect to='/dashboard'/>
    }
        

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Log In</h1>
                <p className="lead"><i className="fas fa-user"></i> Log In to Your Account</p>
                <form className="form" onSubmit={e => formSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} required onChange={e => onChange(e)}/>
                        <small className="form-text"
                            >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            required
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                   Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>                       
        </Fragment>
    )
}


Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  {login}
)(Login)