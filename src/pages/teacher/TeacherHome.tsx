import { useTranslation } from 'react-i18next';

import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const TeacherHome = () => {
  const { t } = useTranslation();

  const tileData = [
    { title: t('teacher.schedule'), path: routes.PUBLIC.TEACHER_SCHEDULE },
    { title: t('teacher.subject'), path: routes.PUBLIC.TEACHER_SUBJECTS },
    { title: t('teacher.journal'), path: routes.PUBLIC.TEACHER_JOURNAL },
  ];

  return <TileList tileData={tileData} />;
};

export default TeacherHome;
