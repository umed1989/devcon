import React, {Fragment, useEffect} from 'react';
import Spinner from './Spinner'
import PostForm from './PostForm'
import PostItem from './PostItem'
import PropTypes from 'prop-types';
import {getPosts} from '../actions/actions'
import {connect} from 'react-redux';

const Posts = ({getPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])

    const renderPosts = () => {
        return (
            <Fragment>
                <h1 className='large text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i> Welcome to the community!
                </p>
                <div className='posts'>
                    <PostForm/>
                    {posts.map(post => (
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
            </Fragment>    
        )
    }

    return (
        <Fragment>
            {loading ? <Spinner/>: renderPosts()}
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)

