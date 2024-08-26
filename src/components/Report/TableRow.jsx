import { Link } from 'react-router-dom';
import FalseReportModal from './FalseReportModal';
import Dropdown from '../../components/ui/Dropdown';
import BanReportModal from './BanReportModal';
import { useState, useEffect } from 'react';
import mainAxios from '../../api/mainAxios';
import Cookies from 'js-cookie';

const ReportManagementBody = ({item, selectedOption}) => {
    const [reportedUser, setReportedUser] = useState(null);

    useEffect(() => {
        if (selectedOption === "User" && item.reportedUserId) {
            const fetchReportedUser = async () => {
                try {
                    const response = await mainAxios.get(`/user/${item.reportedUserId}`, {
                        headers: {
                            authorization: Cookies.get('token'),
                        },
                    });
                    setReportedUser(response.data.data);
                    console.log(response);
                } catch (error) {
                    console.error('Error fetching reported user:', error);
                }
            };
            fetchReportedUser();
        }
    }, [selectedOption, item.reportedUserId]);

    let list = [
        {
            label: "False Report",
            action: () => document.getElementById(`falseReportModal${item.id}`).showModal(),
            modal: <FalseReportModal
                key={item.id}
                id={item.id}
                state={item.reportState}
                selectedOption={selectedOption}
            /> ,
        },
        {
            label: "Ban User",
            action: () => document.getElementById(`banReportModal${item.id}`).showModal(),
            modal: <BanReportModal
                key={item.id}
                id={item.id}
                state={item.reportState}
                selectedOption={selectedOption}
            /> ,
        },
    ]

    const getRowClassName = (state) => {
        switch (state) {
            case 'Unreviewed':
                return '';
            case 'False Report':
                return 'bg-green-100';
            case 'Banned':
                return 'bg-red-100';
            default:
                return '';
        }
    };

    return (
        <tr className={getRowClassName(item.reportState)}>
            <td>{item.id}</td>
            <td>{item.User.username}</td>
            <td>{item.reportContent}</td>
            <td>
                {selectedOption === "Post" ? (
                    <Link to={`/admin/post-view?p=${item.postId}`}>View Post</Link>
                ) : selectedOption === "Comment" ? (
                    <div className="border-2 border-gray-300 rounded p-2 bg-gray-50">
                        {item.Comment?.commentContent}
                    </div>
                ) : selectedOption === "User" && reportedUser ? (
                    <div className="flex items-center justify-center space-x-2 border-2 border-gray-300 rounded p-2 bg-blue-400 text-white rounded-lg">
                        <img 
                            src={reportedUser.UserProfile.profilePictureUrl} 
                            alt={reportedUser.username} 
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{reportedUser.username}</span>
                    </div>
                ) : null}
            </td>
            <td>{item.createdAt}</td>
            <td>{item.reportState}</td>
            <td>
                <Dropdown
                    key={item.id}
                    items={list}
                />
            </td>
        </tr>
    );
};

export default ReportManagementBody;