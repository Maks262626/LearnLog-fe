import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const StudentHome = () => {
  const tileData = [
    { title: 'My Schedule', description: 'See my schedule', path: routes.PUBLIC.STUDENT_SCHEDULE },
    { title: 'My Subjects', description: 'See my current subjects', path: routes.PUBLIC.STUDENT_SUBJECTS },
    { title: 'My Grades', description: 'See my grades', path: routes.PUBLIC.STUDENT_GRADES },
    { title: 'My Attendances', description: 'See my attendance', path: routes.PUBLIC.STUDENT_ATTENDANCES },
  ];

  return <TileList tileData={tileData} />;
};

export default StudentHome;
