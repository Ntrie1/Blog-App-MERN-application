import { Button, Select, Sidebar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
    const navigate = useNavigate();
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const search = useLocation().search;

    console.log(sideBarData);

    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSideBarData({
                ...sideBarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPost = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if (!res.ok) {
                setLoading(false);
                return;
            };

            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if (data.posts.length === 9) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            }


        }

        fetchPost();
    }, [search]);


    const handleChange = async (e) => {
        if (e.target.id == 'searchTerm') {
            setSideBarData({ ...sideBarData, searchTerm: e.target.value });
        }

        if (e.target.id == 'sort') {
            const order = e.target.value || 'desc'
            setSideBarData({ ...sideBarData, sort: order });
        }

        if (e.target.id == 'category') {
            const category = e.target.value || 'uncategorized'
            setSideBarData({ ...sideBarData, category: category });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(search);
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('category', sideBarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


    const handleShowMore = async (e) => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);

        if (!res.ok) return;

        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        };
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2 '>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <TextInput placeholder='Search...'
                            id='searchTerm' type='text'
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='font-semibold'>Sort: </label>
                        <Select onChange={handleChange} id='sort' value={sideBarData.sort}>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>

                    <div>
                        <label className='font-semibold'>Category: </label>
                        <Select onChange={handleChange} id='category' value={sideBarData.category}>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                            <option value="javascript">JavaScript</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink' >
                        Apply Filters
                    </Button>



                </form>
            </div>
            <div>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Post results:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {
                        !loading && posts.length == 0 && (
                            <p className='text-xl text-gray-500'>No posts found.</p>
                        )
                    }

                    {
                        loading && (
                            <p className='text-gray-500'>Loading...</p>
                        )
                    }

                    {!loading &&
                        posts &&
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    }

                    {
                        showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'></button>
                    }
                </div>
            </div>
        </div>
    )
}
