import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = () => {
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [captions, setCaptions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/addComment', {
        userId,
        text,
        images,
        videos,
        captions,
      });
      console.log('Comment added:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <textarea
        placeholder="Comment text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URLs (comma-separated)"
        value={images}
        onChange={(e) => setImages(e.target.value.split(','))}
      />
      <input
        type="text"
        placeholder="Video URLs (comma-separated)"
        value={videos}
        onChange={(e) => setVideos(e.target.value.split(','))}
      />
      <input
        type="text"
        placeholder="Captions"
        value={captions}
        onChange={(e) => setCaptions(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
