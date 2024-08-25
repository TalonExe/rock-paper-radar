import { useState, useEffect } from 'react';
import LoadingSpinner from "../ui/LoadingSpinner";
import staffStore from '../../stores/staffStore';
import TableRow from './TableRow';

const ReportManagementBody = () => {
    const [isLoading, setIsLoading] = useState(true);
    const getReportPost = staffStore((state) => state.getReportPost);
    const reportPost = staffStore((state) => state.reportPost);
    const [selectedOption, setSelectedOption] = useState('Post');
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                if (selectedOption === 'Post'){
                    setIsLoading(true);
                    await getReportPost();
                    console.log(reportPost);
                    setIsLoading(false);
                }
                else {
                    // setIsLoading(true);
                    // await getReportPost();
                    // setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPostDetails();
    }, [getReportPost, selectedOption]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className="join mb-4">
                <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="Post"
                    checked={selectedOption === 'Post'}
                    onChange={() => handleOptionChange('Post')}
                />
                <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label= "Comment"
                    checked={selectedOption === 'Comment'}
                    onChange={() => handleOptionChange('Comment')}
                />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='overflow-x-auto bg-white h-full w-full flex flex-col justify-start p-6 items-center'>
                <table className='table w-full my-12 p-20 rounded-xl'>
                    <thead className='bg-blue-400'>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Report Content</th>
                            <th>Post Link</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportPost.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    postId={item.postId}
                                    item={item}
                                />
                            )
                        })}
                    </tbody>
                </table>
                </div>              
                
            )}
        </div>
    );
};

export default ReportManagementBody;