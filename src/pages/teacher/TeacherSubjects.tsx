import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';

import SubjectList from '@/components/Lists/SubjectList';
import Loader from '@/components/common/Loader';

import { useGetTeacherSubjectsQuery } from '@/redux/subjectApiSlice';

const TeacherSubjects = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTeacherSubjectsQuery();

  const handleClick = (id: string) => {
    navigate(routes.PUBLIC.TEACHER_ASSIGMENTS, { state: { subjectId: id } });
  };

  if (isLoading) {
    return <Loader />;
  }

  return <SubjectList subjects={data?.data || []} handleClick={handleClick} />;
};

export default TeacherSubjects;
