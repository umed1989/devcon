import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {addPost} from '../actions/actions';
import {connect} from 'react-redux'

const PostForm = ({addPost}) => {
    const [text, setText] = useState('')
    
    const formSubmit = e => {
        e.preventDefault();
        addPost(text);
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => formSubmit(e)}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                onChange = {e => setText({text: e.target.value})}
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)

