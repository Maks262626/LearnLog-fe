import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { Box, Button } from '@mui/material';

import SubjectList from '@/components/Lists/SubjectList';
import Loader from '@/components/common/Loader';

import { useGetSubjectsInMyFacultyQuery } from '@/redux/subjectApiSlice';

const Subjects = () => {
  const navigate = useNavigate();
  const { data: subjects, isLoading } = useGetSubjectsInMyFacultyQuery();
  const handleEdit = (id: string) => {
    navigate(`${routes.PUBLIC.UPDATE_SUBJECT}/${id}`);
  };
  if (isLoading || !subjects) {
    return <Loader />;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(routes.PUBLIC.CREATE_SUBJECT)}
        sx={{ alignSelf: 'center' }}
      >
        Create Subject
      </Button>
      <SubjectList subjects={subjects?.data} handleEdit={handleEdit} />
    </Box>
  );
};

export default Subjects;
