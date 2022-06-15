import React, { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "./PostItem";

function App() {
    
    sessionStorage.setItem('activeUser', 'Anchen');

    const [postMessage, setPostMessage] = useState({
        message: '',
        user: sessionStorage.getItem('activeUser'),
    })

    const [userId, setUserId] = useState({
        activeUser: sessionStorage.getItem('activeUser'),
    });

    const [posts, setPosts] = useState();

    const [renderPost, setRenderPost] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:8888/AssessmentTwo/readUserPosts.php', userId)
        .then((res) => {
            let data = res.data;
            let renderPost = data.map((item) =>
                <PostItem
                    key={ item.id }
                    rerender={ setRenderPost }
                    uniqueId={ item.id }
                    userpost={ item.userPost }
                    date={ item.date }
                    message={ item.message }
                />
            ); 
            setPosts(renderPost);
            setRenderPost(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, [renderPost]);

    const messageVal = (e) => {
        const value = e.target.value;
        setPostMessage({ ...postMessage, message: value });
    }

    const addNewPost = (e) => {
        e.preventDefault();
        document.getElementById('textMes').value = "";
        axios.post('http://localhost:8888/AssessmentTwo/addPost.php', postMessage)
        .then((res) => {
            let data = res.data;
            setRenderPost(true);
        });
    }

    return (
    <div className="App">
        <div className="left">
        <h1>Your Post Timeline</h1>
        <p>Populate the area below with posts from the form to the right...</p>

        <div className="post_item">
        {posts}
        </div>
        </div>

        <div className="right">
            <form>
            <h3>Add A New Post</h3>
            <textarea id="textMes" placeholder="your post here" onChange={messageVal} />
            <button type="submit" onClick={addNewPost}>Add Your New Post</button>
            </form>
        </div>
    </div>
    );
}

export default App;