import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts)
    }

    fetchData();
  }, []);
  console.log(posts);


  return (
    <div>
      <div className='flex flex-col gap-6 p-p-3 p-28 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-sm sm:text-sm'>Here you can find variety of articles and tutorials on topics such as web development. software engineering and programming.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-6 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>
                Recent Posts</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link to='/search' className='text-lg text-teal-500 hover:unnderline text-center'>
                View all posts
              </Link>
            </div>
          )
        }

      </div>
    </div>
  )
} 
