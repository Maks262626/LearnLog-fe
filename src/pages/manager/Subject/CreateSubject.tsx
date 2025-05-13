import { SubjectValidationType } from '@/utils/zod-validation';

import { useCreateSubjectMutation } from '@/redux/subjectApiSlice';

import SubjectForm from '../../../components/Forms/SubjectForm';

const CreateSubject = () => {
  const [createSubject] = useCreateSubjectMutation();

  const onSubmit = async (data: SubjectValidationType) => {
    await createSubject(data);
  };

  return <SubjectForm onSubmit={onSubmit} />;
};

export default CreateSubject;
