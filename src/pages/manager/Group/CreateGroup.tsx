import { GroupValidationType } from '@/utils/zod-validation';

import { useCreateGroupMutation } from '@/redux/groupSlice';

import GroupForm from '../../../components/Forms/GroupForm';

const CreateGroup = () => {
  const [createGroup] = useCreateGroupMutation();

  const onSubmit = async (data: GroupValidationType) => {
    await createGroup(data);
  };

  return <GroupForm onSubmit={onSubmit} />;
};

export default CreateGroup;
