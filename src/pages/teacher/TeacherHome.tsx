import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const TeacherHome = () => {
  const tileData = [
    { title: 'My Schedule', description: 'See my schedule', path: routes.PUBLIC.TEACHER_SCHEDULE },
    { title: 'My Subjects', description: 'See my current subjects', path: routes.PUBLIC.TEACHER_SUBJECTS },
    { title: 'My Journal', description: 'See my groups journal', path: routes.PUBLIC.TEACHER_JOURNAL },
  ];

  return <TileList tileData={tileData} />;
};

export default TeacherHome;
