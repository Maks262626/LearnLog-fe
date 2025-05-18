import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '@/routes';
import { Box } from '@mui/material';

import Loader from '@/components/common/Loader';
import DangerZone from '@/components/settings/DangerZone';

import { SubjectValidationType } from '@/utils/zod-validation';

import { useDeleteSubjectMutation, useGetSubjectByIdQuery, useUpdateSubjectMutation } from '@/redux/subjectApiSlice';

import SubjectForm from '../../../components/Forms/SubjectForm';

const UpdateSubject = () => {
  const { id } = useParams();
  if (!id) return;

  const { data: subject } = useGetSubjectByIdQuery(id);
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SubjectValidationType) => {
    await updateSubject({ id, body: data });
  };

  const handleDelete = async () => {
    await deleteSubject(id);
    navigate(routes.PUBLIC.SUBJECT);
  };

  if (!subject) {
    return <Loader />;
  }

  return (
    <>
      <SubjectForm subject={subject.data} onSubmit={onSubmit} />;
      <Box sx={{ display: 'grid', placeItems: 'center', mt: 3 }}>
        <DangerZone handleDelete={handleDelete} />
      </Box>
    </>
  );
};

export default UpdateSubject;
