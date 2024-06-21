import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  });

  const handleSignOut = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {

    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
              Profile
            </Sidebar.Item >
          </Link>
          
          <Link to={'/dashboard?tab=posts'}>
            <Sidebar.Item active={tab === 'post'} icon={HiDocumentText} as='div'>
              Posts
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className='cursor-pointer' as='div'>
            Sign Out
          </Sidebar.Item >
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
