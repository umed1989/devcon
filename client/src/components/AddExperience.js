import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {addExperience} from '../actions/actions'
import {connect} from 'react-redux'

 const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        title: '', 
        company: '', 
        location: '', 
        from: '', 
        to: '', 
        decription: "", 
        current: false
     })

    const {title, company, location, from, to, description, current} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

     const formSubmit = e => {
         e.preventDefault();
         addExperience(formData, history)
         console.log(formData)
     }

    return (
        <Fragment >
            <div className="container">
                <h1 className="large text-primary">
                    Add An Experience
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={formSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name = 'title' value={title} required onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Company" name = 'company' value={company} required onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name = 'location' value={location} onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                    <input type="date" value={from} name = 'from' onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <p><input type="checkbox" value={current}  onClick={() => setFormData({...formData, current: !current})}/> {' '}Current Job</p>
                    </div> 
                    <div className="form-group">
                        <h4>To Date</h4>
                    <input type="date" value={to} name= 'to' disabled = {current} onChange= {(e) => onChange(e)}/> 
                    </div>
                    <div className="form-group">
                    <textarea
                        name='description'
                        value={description}
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        onChange = {(e) => onChange(e)}
                    ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </div>
    </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));