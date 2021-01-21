import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {addEducation} from '../actions/actions'
import {connect} from 'react-redux'

 const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '', 
        degree: '', 
        fieldOfStudy: '', 
        from: '', 
        to: '', 
        decription: "", 
        current: false
     })

    const {school, degree, fieldOfStudy, from, to, description, current} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

     const formSubmit = e => {
         e.preventDefault();
         addEducation(formData, history)
         console.log(formData)
     }

    return (
        <Fragment >
            <div className="container">
                <h1 className="large text-primary">
                    Add An Education
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any college/bootcamps
                     that you attended in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={formSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="* School or Bootcamp" name = 'school' value={school} required onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Degree" name = 'degree' value={degree} required onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Field of Study" name = 'fieldOfStudy' value={fieldOfStudy} onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                    <input type="date" value={from} name = 'from' onChange = {(e) => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <p><input type="checkbox" value={current}  onClick={() => setFormData({...formData, current: !current})}/> {' '}Current School</p>
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
                        placeholder="School Description"
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

addEducation.PropTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation);