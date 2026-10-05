import { useState, useEffect } from 'react'

import './App.css'

export default function Posts() {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=> {
      async function fetchData() {
          try {
            setLoading(true);
            setError(false)

            const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
            const postData = await postResponse.json();
            setPost(postData);

            const userResponse = await fetch('https://jsonplaceholder.typicode.com/users')
            const userData = await userResponse.json();
            setUser(userData);

            if(!postResponse) {
              throw new Error("Failed to fetch Post");
            }

            if(!userResponse) {
              throw new Error("Failed to fetch User")
            }

          } catch (err) {
            setError(err.message)
          } finally {
            setLoading(false)
          }
      }
      fetchData();

    
  },[])

    if (loading) {
        return <p>Loading</p>
      }

      if(error) {
        return <p>Error: {error}</p>
      }
return (
    <>
    <a href="/">Pokemon</a>
      <div className="home-container">
          <div className="home-content">
      {post.map((posts)=> {
          const userUpdated = user.find((user) => user.id === posts.userId)
                return(
                  <article key={posts.id}>
             <div className="post-card">
                    <div className="card-header">
                        <div className="card-profile">
                            <img 
      src="https://placehold.co/400x400/EEE/31343C?text=Avatar" 
      alt="Profile placeholder" 
      width="40" 
      height="40" 
    />
                        </div>
                        <div className="card-user">
                            <label htmlFor="">{userUpdated.name}</label>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="card-content">
                        <div className="card-title">{posts.title}
                        </div>
                        <div className="card-post"> {posts.body}
                        </div>
                    </div>
                </div>
                </article>
                )
           })}
          </div>
      </div>
    </>
  )
}




