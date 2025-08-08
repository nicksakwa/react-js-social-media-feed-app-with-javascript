// social-media-feed/src/Post.js
import React, { useState, useEffect } from 'react';
import './Post.css';

function Post(props) {
    const [likesCount, setLikesCount] = useState(props.initialLikes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newCommentText, setNewCommentText] = useState('');
    const [isFollowing, setIsFollowing] = useState(props.isFollowing || false); // New state for follow status

    // Effect 1: Fetch comments (remains the same)
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


    // New Event Handler for the follow button
    const handleFollowClick = async () => {
        // Optimistically update the UI first
        const newFollowStatus = !isFollowing;
        setIsFollowing(newFollowStatus);
        
        console.log(`[ACTION] User is now ${newFollowStatus ? 'following' : 'unfollowing'} ${props.authorName}`);
        
        // This is the side effect: an API call to your backend
        try {
            // Simulate an API call to follow/unfollow the user
            const response = await new Promise(resolve => setTimeout(() => {
                console.log(`[API CALL] API request sent to ${newFollowStatus ? 'follow' : 'unfollow'} user ${props.authorName}`);
                // In a real app, you would get a success/failure response here
                resolve({ success: true });
            }, 500));

            if (!response.success) {
                console.error("API call failed, reverting UI.");
                setIsFollowing(!newFollowStatus); // Revert UI on failure
            }

        } catch (error) {
            console.error("Error during follow API call:", error);
            setIsFollowing(!newFollowStatus); // Revert UI on network error
        }
    };
    
    // ... (other handlers like handleLikeClick and handleAddComment remain the same)

    const handleLikeClick = () => {
        if (isLiked) {
            setLikesCount(prevCount => prevCount - 1);
        } else {
            setLikesCount(prevCount => prevCount + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleAddComment = () => {
        if (newCommentText.trim() === '') return;
        const newComment = { id: Date.now(), text: newCommentText.trim(), author: 'You' };
        setComments(prevComments => [...prevComments, newComment]);
        setNewCommentText('');
        console.log(`[ACTION] Sending new comment to backend for post ID ${props.postId}: "${newComment.text}"`);
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <img src={props.authorProfilePic || 'https://via.placeholder.com/40x40?text=👤'} alt="Profile" className="profile-pic" />
                <div className="header-info">
                    <span className="author-name">{props.authorName}</span>
                    <span className="timestamp">{props.timestamp}</span>
                </div>
            </div>

            {/* New Follow Button */}
            <button
                onClick={handleFollowClick}
                className={`follow-button ${isFollowing ? 'following' : ''}`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>

            {/* ... rest of the JSX remains the same ... */}
            <div className="post-content">
                <p>{props.postText}</p>
                {props.postImage && <img src={props.postImage} alt="Post content" className="post-image" />}
            </div>
            <div className="post-actions">
                <button
                    onClick={handleLikeClick}
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                >
                    ❤️ {isLiked ? 'Liked' : 'Like'} ({likesCount})
                </button>
            </div>
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
        </div>
    );
}

export default Post;