import { Link } from 'react-router-dom';
import FalseReportModal from './FalseReportModal';
import Dropdown from '../../components/ui/Dropdown';
import BanReportModal from './BanReportModal';

const ReportManagementBody = ({postId, item}) => {
    let list = [
        {
            label: "False Report",
            action: () => document.getElementById(`falseReportModal${item.id}`).showModal(),
            modal: <FalseReportModal
                key={item.id}
                id={item.id}
            /> ,
        },
        {
            label: "Ban User",
            action: () => document.getElementById(`banReportModal${item.id}`).showModal(),
            modal: <BanReportModal
                key={item.id}
                id={item.id}
            /> ,
        },
    ]

    return (
        <>
            <tr>
                <td>{item.id}</td>
                <td>{item.User.username}</td>
                <td>{item.reportContent}</td>
                <td><Link to={`/admin/post-view?p=${item.postId}`}>View Post</Link></td>
                <td>{item.createdAt}</td>
                <td>{item.reportState}</td>
                <td>
                <Dropdown
                    key={item.id}
                    items={list}
                    />
                </td>
            </tr>
        </> 
    );
};

export default ReportManagementBody;