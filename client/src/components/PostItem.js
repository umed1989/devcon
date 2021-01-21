import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import formatDate from '../utils/formatDate'
import {deleteLike, updateLike, deletePost} from '../actions/actions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

const PostItem = ({auth, deleteLike, deletePost, updateLike, post: {_id, text, avatar, name, user, likes, comments, date}}) => {
    return (
        <Fragment>
           <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile`} >
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on {formatDate(date)}
                </p>

                <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Discussion{' '}
                    {comments.length > 0 && (
                    <span className="comment-count">{comments.length}</span>
                    )}
                </Link>

                {likes.length > 0  && (
                    <button type="button" className="btn btn-light" onClick = {e => updateLike(_id)}>
                    <i className="fas fa-thumbs-up"></i>
                    <span>{likes.length}</span>
                </button>
                )}
  
                <button type="button" className="btn btn-light" onClick={e => deleteLike(_id)}>
                    <i className="fas fa-thumbs-down"></i>
                </button>
                
                {!auth.loading && user === auth.user._id && (
                    <button 
                        onClick = {e => deletePost(_id)}     
                        type="button"
                        className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>    
                    )
                }
                
            </div>
        </div>
        </Fragment>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteLike: PropTypes.func.isRequired,
    updateLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteLike, updateLike, deletePost})(PostItem)