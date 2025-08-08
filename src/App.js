// social-media-feed/src/App.js
import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  const posts = [
    {
      postId: 'post-abc-1',
      authorName: 'Alice Johnson',
      authorProfilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
      postText: 'Enjoying a beautiful sunset at the beach! 🌅 So peaceful.',
      postImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961fac?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      initialLikes: 25,
      timestamp: '3 hours ago',
      isFollowing: true, // Alice is already being followed
    },
    {
      postId: 'post-def-2',
      authorName: 'Bob Williams',
      authorProfilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
      postText: 'Just finished my morning run! Feeling great. 💪 #fitness',
      postImage: 'https://images.unsplash.com/photo-1517836357463-d262fe253880?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      initialLikes: 10,
      timestamp: '1 hour ago',
      isFollowing: false, // Bob is not being followed yet
    },
    {
      postId: 'post-ghi-3',
      authorName: 'Charlie Brown',
      authorProfilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
      postText: 'Cooking up some delicious pasta tonight! 🍝 What are you having?',
      postImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      initialLikes: 40,
      timestamp: '5 hours ago',
      isFollowing: false, // Charlie is not being followed yet
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Social Media Feed</h1>
      </header>
      <div className="posts-container">
        {posts.map(post => (
          <Post
            key={post.postId}
            {...post}
          />
        ))}
      </div>
    </div>
  );
}

export default App;