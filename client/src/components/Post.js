import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom'
import Spinner from './Spinner';
import PostItem from './ProfileItem';
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { getPost } from '../actions/actions';

const Post = ({getPost, match, post: {post, loading}}) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    if(loading || post === null){
        return <Spinner/>
    } 

    return (
        <Fragment>
            <Link to='/post' className ='btn'>
                Back to posts
            </Link>
            <PostItem post={post} />
            <CommentForm postId={post._id}/>
            <div className="comment">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                ))}
            </div>
        </Fragment>
    )


}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
