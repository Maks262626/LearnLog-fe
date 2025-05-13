import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';

import SubjectList from '@/components/Lists/SubjectList';
import Loader from '@/components/common/Loader';

import { useGetSubjectsInMyGroupQuery } from '@/redux/subjectApiSlice';

const StudentSubjects = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubjectsInMyGroupQuery();

  const handleClick = (id: string) => {
    navigate(routes.PUBLIC.STUDENT_ASSIGNMENTS, { state: { subjectId: id } });
  };

  if (isLoading) {
    return <Loader />;
  }

  return <SubjectList subjects={data?.data || []} handleClick={handleClick} />;
};

export default StudentSubjects;
