import { useTranslation } from 'react-i18next';

import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const StudentHome = () => {
  const { t } = useTranslation();

  const tileData = [
    { title: t('student.schedule'), path: routes.PUBLIC.STUDENT_SCHEDULE },
    { title: t('student.subject'), path: routes.PUBLIC.STUDENT_SUBJECTS },
    { title: t('student.grade'), path: routes.PUBLIC.STUDENT_GRADES },
    { title: t('student.attendance'), path: routes.PUBLIC.STUDENT_ATTENDANCES },
  ];

  return <TileList tileData={tileData} />;
};

export default StudentHome;
