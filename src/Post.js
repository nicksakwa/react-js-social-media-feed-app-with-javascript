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
    // In a real app, this would likely come from a global state manager (like Redux, Context API).
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // --- Event Handler for Login Action ---
    // This function will be triggered by a button click
    const handleLoginPrompt = () => {
        alert("Please log in to interact with this post!");
        
        // In a real application, this would redirect the user to a login page
        // or open a login modal. After successful login, you would update
        // the 'isLoggedIn' state. For this example, we'll simulate a successful login.
        setTimeout(() => {
            setIsLoggedIn(true);
            alert("You are now logged in!");
        }, 1000);
    };

    // --- Updated Event Handler for Liking ---
    const handleLikeClick = () => {
        if (!isLoggedIn) {
            handleLoginPrompt(); // Prompt for login if not logged in
            return;
        }

        if (isLiked) {
            setLikesCount(prevCount => prevCount - 1);
        } else {
            setLikesCount(prevCount => prevCount + 1);
        }
        setIsLiked(!isLiked);
    };

    // --- Updated Event Handler for Commenting ---
    const handleAddComment = () => {
        if (!isLoggedIn) {
            handleLoginPrompt(); // Prompt for login if not logged in
            return;
        }

        if (newCommentText.trim() === '') return;
        const newComment = { id: Date.now(), text: newCommentText.trim(), author: 'You' };
        setComments(prevComments => [...prevComments, newComment]);
        setNewCommentText('');
        console.log(`[ACTION] Sending new comment to backend for post ID ${props.postId}: "${newComment.text}"`);
    };

    // --- The JSX now conditionally renders the buttons based on login status ---
    return (
        <div className="post-card">
            <div className="post-header">
                <img src={props.authorProfilePic || 'https://via.placeholder.com/40x40?text=👤'} alt="Profile" className="profile-pic" />
                <div className="header-info">
                    <span className="author-name">{props.authorName}</span>
                    <span className="timestamp">{props.timestamp}</span>
                </div>
            </div>

            <button
                onClick={handleLoginPrompt}
                style={{display: isLoggedIn ? 'none' : 'block'}}
                className="login-button"
            >
                Log In to Interact
            </button>
            
            <button
                onClick={handleLikeClick}
                className={`like-button ${isLiked ? 'liked' : ''}`}
            >
                ❤️ {isLiked ? 'Liked' : 'Like'} ({likesCount})
            </button>

            {/* ... other parts of the JSX remain the same ... */}
        </div>
    );
}

export default Post;