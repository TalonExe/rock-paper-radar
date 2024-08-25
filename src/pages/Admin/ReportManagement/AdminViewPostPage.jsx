import ViewPostBody from '../../../components/Posts/ViewPostBody'
import UserLayout from '../../../components/Layouts/UserLayout'
import Header from '../../../components/ui/Header'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import BackButton from '../../../components/ui/BackButton';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import AdminViewPostBody from './AdminViewPostBody';

const AdminViewPostPage = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('p');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!postId) {
      navigate('/admin/report-management');
    }
    setIsLoading(false);
  }, [postId, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AdminLayout>
      <Header className='flex flex-row items-center gap-6'>
        <BackButton to="/admin/report-management"  />
        <span className='text-2xl'><b>Posts</b></span>
      </Header>
      <AdminViewPostBody postId={postId} />
    </AdminLayout>
  )
}

export default AdminViewPostPage