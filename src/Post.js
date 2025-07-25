import React, {useState, useEffect} from 'react';
import './Post.css';

function Post(props){
    const [likesCount, setLikesCount]= useState(props.initialLikes || 0);
    const [isLiked, setIsLiked]= useState(false);
    const [comments, setComments]= useState([]);
    const [showCommentInput, setShowCommentInput]= useState(false);
    const [newCommentText, setNewCommentText]= useState('');

    useEffect(()=> {
        console.log('Post "${props.postText.substring(0, Math.min(props.postText.length, 20))}..."(ID: ${props.postid}) has been mounted');
        return()=>{
            console.log('Post "${props.postText.substring(0, Math.min(props.postText, 20))}..."(ID: ${props.postid}) has been unmounted');
        };
    }, [props.postText, props.postText]);

    useEffect(()=>{
        if(typeof props.initialLikes !=='undefined' && likesCount !== props.initialLikes){
           console.log('[EFFECT] updating backend with new likes count for post ID ${props.postid}: ${LikesCount}');
        } else if(typeof props.initialLikes === 'undefined' && likesCount > 0){
            console.log('[EFFECT] updating backedn with new likes count for post ID ${props.postid}:${likesCount}');
        }
},[LikesCount, props.postId, props.initialLikes]);

useEffect(()=>{
    const fetchComments=async()=>{
        console.log('[EFFECT]Fetching comments for post ID:{{props.postid}}');
        //simmulate fetching comments from an API
        try{
            const response=await new Promise(resolve=> setTImeout(()=>{
                //dummy comments
                const dummyComments=[
                    {id: 101, author: 'Alice',text: 'Great photo!'},
                    {id: 102, author: 'Bob', text: 'Looks like fun!'}
                ];
                resolve(dummyComments);
            }, 700));
            setComments(response);
        } catch(error){
            console.error("Error fetching comments:", error);
        }
    };

    if(props.postId){
        fetchComments();
    }
}, [props.postId]);

const handleslikeClick=()=>{
    if(isLiked){
        setLikesCount(prevCount =>prevCount - 1);
    } else {
        setLikesCount(prevCount => prevCount + 1);
    }
    setIsLiked(!isLiked);
};

const handleAddComment=()=>{
    if(newCommentText.trim() === '') return;
    const newComment={ id: Date.now(), text: newCommentText.trim(), author: 'You'};
    setComments(prevComments =>[...prevComments, newComment]);
    setNewCommentText('');
    console.log('[ACTION] Sending new comment to backend for post ID {props.postid}: "${newComment.text}"');
};
return(
    <div className="post-card">
        <div className="post-header">
            <img src={props.authorProfilePic || 'https://via.placeholder.com/40*40?text='} alt="Profile" className="profile-pic" />
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
                className={'like-button ${isLiked ? 'Liked' : ''}'}
            >
                {isLiked ? 'Liked' : 'Like'}({LikesCount})
            </button>
        </div>  
        <div className="comments-section">
            <h4>Comments</h4>
            {comments.length === 0 ?(
                <p>No commentsyet.</p>
            ):(
                comments.map(comment)=>(
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
                    onChange={(e)=> setNewCommentText(e.target.value)}
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            handleAddComment():
                        }
                    }}
                />
                <button onClick={handleAddComment}>Post Comment</button>
            </div>
        </div>
    </div>
    };
}

export default Post;