import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector(state => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('')


  const userId = currentUser._id;
  const isAdmin = currentUser.isAdmin;
  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {

      }
    }

    fetchPosts();
  }, [userId]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${userId}&startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };


  const handleDeletePost = async () => {
    setShowModal(false);
    console.log(postIdToDelete);
    console.log(userId);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {

    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300'>
      {isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Data updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>

              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className='devide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-20 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    {post.category}
                  </Table.Cell>

                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true)
                      setPostIdToDelete(post._id)
                    }
                    }
                      className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline cursor-pointer' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
          )}
        </>
      ) : (
        <p> no posts yet </p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your post?</h3>
          </div>
          <div className='flex justify-between'>
            <Button color='failure' onClick={handleDeletePost} >
              Yes, I am sure.
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)} >
              No, cancel.
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}