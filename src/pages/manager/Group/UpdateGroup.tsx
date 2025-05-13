import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '@/routes';
import { Box } from '@mui/material';

import DangerZone from '@/components/DangerZone';
import Loader from '@/components/common/Loader';

import { GroupValidationType } from '@/utils/zod-validation';

import { useDeleteGroupMutation, useGetGroupByIdQuery, useUpdateGroupMutation } from '@/redux/groupSlice';

import GroupForm from '../../../components/Forms/GroupForm';

const UpdateGroup = () => {
  const { id } = useParams();
  if (!id) return;

  const { data: group, isLoading } = useGetGroupByIdQuery(id);
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: GroupValidationType) => {
    await updateGroup({ id, body: data });
  };

  const handleDelete = async () => {
    await deleteGroup(id);
    navigate(routes.PUBLIC.GROUP);
  };

  if (isLoading || !group) {
    return <Loader />;
  }

  return (
    <>
      <GroupForm onSubmit={onSubmit} group={group.data} />
      <Box sx={{ display: 'grid', placeItems: 'center', mt: 3 }}>
        <DangerZone handleDelete={handleDelete} />
      </Box>
    </>
  );
};

export default UpdateGroup;
