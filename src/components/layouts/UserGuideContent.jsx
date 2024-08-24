import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import mainAxios from "../../api/mainAxios";
import Cookies from "js-cookie";

const UserGuideContent = ({ content = [], onDelete }) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await mainAxios.delete(`/userguide/${deleteId}`, {
          headers: {
            Authorization: Cookies.get('token')
          }
        });
        onDelete(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting user guide:', error);
      }finally{
        window.location.reload();
      }
    }
  };

  return (
    <div className="w-screen">
      {content.map((item, index) => (
        <div key={index} className="px-7 py-5 bg-slate-100 w-full h-full">
          <div className="flex flex-row justify-between">
            <h2 className="card-title font-bold text-3xl mb-4">{item.title}</h2>
            {isAdmin && (
              <div className="flex gap-2">
                <Link to={`/admin/user-guide-edit/${item.id}`} className="btn btn-primary">
                  Edit User Guide
                </Link>
                <button onClick={() => setDeleteId(item.id)} className="btn btn-error">
                  Delete User Guide
                </button>
              </div>
            )}
          </div>
          <div className="border-t-2 border-slate-300 py-2 space-y-4">
            {item.desc.split("\n").map((paragraph, index) => (
              <p key={index} className="my-3 text-pretty">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this user guide?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGuideContent;