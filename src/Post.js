import React, { useState, useEffect } from 'react';
import './Post.css'; 

function Post(props) {
    const [likesCount, setLikesCount] = useState(props.initialLikes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newCommentText, setNewCommentText] = useState(''); // State for the new comment input

    // Effect 1: Log when the component mounts and unmounts
    useEffect(() => {
        console.log(`Post "${props.postText.substring(0, Math.min(props.postText.length, 20))}..." (ID: ${props.postId}) has been mounted.`);

        // Cleanup function: runs when the component unmounts
        return () => {
            console.log(`Post "${props.postText.substring(0, Math.min(props.postText.length, 20))}..." (ID: ${props.postId}) has been unmounted.`);
        };
    }, [props.postId, props.postText]); // Dependency array: run if postId or postText changes

    // Effect 2: Simulate updating the backend when likesCount changes
    useEffect(() => {
        // Only run if likesCount has actually changed from its initial prop value
        // or if it's not the very first render and it's different from the initial value
        // A more robust check might involve an initial mount flag or a ref
        if (typeof props.initialLikes !== 'undefined' && likesCount !== props.initialLikes) {
            console.log(`[EFFECT] Updating backend with new like count for post ID ${props.postId}: ${likesCount}`);
            // In a real application, you'd make an API call here:
            // api.updatePostLikes(props.postId, likesCount);
        } else if (typeof props.initialLikes === 'undefined' && likesCount > 0) {
             // For posts starting with 0 likes and then increasing
             console.log(`[EFFECT] Updating backend with new like count for post ID ${props.postId}: ${likesCount}`);
        }
    }, [likesCount, props.postId, props.initialLikes]); // Dependencies ensure it runs when these values change

    // Effect 3: Fetch comments for the post when the component mounts or postId changes
    useEffect(() => {
        const fetchComments = async () => {
            console.log(`[EFFECT] Fetching comments for post ID: ${props.postId}`);
            // Simulate an API call
            try {
                const response = await new Promise(resolve => setTimeout(() => {
                    // Dummy comments, could be different for different post IDs if you expand this
                    const dummyComments = [
                        { id: 101, author: 'Alice', text: 'Great photo!' },
                        { id: 102, author: 'Bob', text: 'Looks like fun!' }
                    ];
                    resolve(dummyComments);
                }, 700)); // Simulate 700ms delay for fetching comments
                setComments(response);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        if (props.postId) { // Only fetch if postId exists
            fetchComments();
        }
    }, [props.postId]); // Runs only when postId changes (or once on mount if postId doesn't change)


    const handleLikeClick = () => {
        if (isLiked) {
            setLikesCount(prevCount => prevCount - 1); // Use functional update for state
        } else {
            setLikesCount(prevCount => prevCount + 1);
        }
        setIsLiked(!isLiked); // Toggle liked status
    };

    const handleAddComment = () => {
        if (newCommentText.trim() === '') return; // Don't add empty comments

        const newComment = { id: Date.now(), text: newCommentText.trim(), author: 'You' };
        setComments(prevComments => [...prevComments, newComment]); // Use functional update
        setNewCommentText(''); // Clear input
        // In a real app, you'd also send this new comment to the backend
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