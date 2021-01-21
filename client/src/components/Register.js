import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {setAlert, register} from '../actions/actions'
import {connect} from 'react-redux';

 const Register = ({register, setAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {name, email, password, passwordConfirm} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const formSubmit = e => {
        try {
            e.preventDefault();
            if (password !== passwordConfirm) {
                 setAlert('Passwords do not match!!!', 'danger')
            } else {
                register({name, email, password})
            }
        }
         catch(err) {
            console.log(err)
        }
    }

    if(isAuthenticated) {
        return  <Redirect to='/dashboard'/>
    }
        
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => formSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" required value={name} onChange={e => onChange(e)}/>
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="passwordConfirm"
                            minLength="6"
                            onChange={e => onChange(e)}
                            value={passwordConfirm}
                            />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>                       
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps, {setAlert, register}
)(Register)
