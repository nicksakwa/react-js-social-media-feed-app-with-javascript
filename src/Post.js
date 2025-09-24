// social-media-feed/src/Post.js
import React, { useState, useEffect } from 'react';
import './Post.css';

function Post(props) {
    const [likesCount, setLikesCount] = useState(props.initialLikes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [isFollowing, setIsFollowing] = useState(props.isFollowing || false);
    
    // New state to manage the user's login status locally.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Effect to fetch comments on mount
    useEffect(() => {
        const fetchComments = async () => {
            console.log(`[EFFECT] Fetching comments for post ID: ${props.postId}`);
            try {
                const response = await new Promise(resolve => setTimeout(() => {
                    const dummyComments = [
                        { id: 101, author: 'Alice', text: 'Great photo!' },
                        { id: 102, author: 'Bob', text: 'Looks like fun!' }
                    ];
                    resolve(dummyComments);
                }, 700));
                setComments(response);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        if (props.postId) {
            fetchComments();
        }
    }, [props.postId]);

    // Event Handler for Login Action
    const handleLoginPrompt = () => {
        alert("Please log in to interact with this post!");
        setTimeout(() => {
            setIsLoggedIn(true);
            alert("You are now logged in!");
        }, 1000);
    };

    // Event Handler for Liking
    const handleLikeClick = () => {
        if (!isLoggedIn) {
            handleLoginPrompt();
            return;
        }

        if (isLiked) {
            setLikesCount(prevCount => prevCount - 1);
        } else {
            setLikesCount(prevCount => prevCount + 1);
        }
        setIsLiked(!isLiked);
    };

    // Event Handler for Commenting
    const handleAddComment = () => {
        if (!isLoggedIn) {
            handleLoginPrompt();
            return;
        }

        if (newCommentText.trim() === '') return;
        const newComment = { id: Date.now(), text: newCommentText.trim(), author: 'You' };
        setComments(prevComments => [...prevComments, newComment]);
        setNewCommentText('');
        console.log(`[ACTION] Sending new comment to backend for post ID ${props.postId}: "${newComment.text}"`);
    };

    // Event Handler for Follow/Unfollow
    const handleFollowClick = async () => {
        const newFollowStatus = !isFollowing;
        setIsFollowing(newFollowStatus);
        
        console.log(`[ACTION] User is now ${newFollowStatus ? 'following' : 'unfollowing'} ${props.authorName}`);
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <img src={props.authorProfilePic || 'https://via.placeholder.com/40x40?text=👤'} alt="Profile" className="profile-pic" />
                <div className="header-info">
                    <span className="author-name">{props.authorName}</span>
                    <span className="timestamp">{props.timestamp}</span>
                </div>
                <button
                    onClick={handleFollowClick}
                    className={`follow-button ${isFollowing ? 'following' : ''}`}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
            </div>

            {/* Post Content Section - This was missing from your code */}
            <div className="post-content">
                <p>{props.postText}</p>
                {props.postImage && <img src={props.postImage} alt="Post content" className="post-image" />}
            </div>

            {/* Actions Section - This was also missing or incomplete */}
            <div className="post-actions">
                <button
                    onClick={handleLikeClick}
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                >
                    ❤️ {isLiked ? 'Liked' : 'Like'} ({likesCount})
                </button>
            </div>

            {/* Comments Section - Also missing */}
            <div className="comments-section">
                <h4>Comments</h4>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <p key={comment.id}>
                            <b>{comment.author}:</b> {comment.text}
                        </p>
                    ))
                )}
                <div className="comment-input-area">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddComment();
                            }
                        }}
                    />
                    <button onClick={handleAddComment}>Post Comment</button>
                </div>
            </div>
            {/* The Login button below is for a specific login prompt scenario, so it's placed after the main post content */}
            <button
                onClick={handleLoginPrompt}
                style={{display: isLoggedIn ? 'none' : 'block'}}
                className="login-button"
            >
                Log In to Interact
            </button>
        </div>
    );
}

export default Post;