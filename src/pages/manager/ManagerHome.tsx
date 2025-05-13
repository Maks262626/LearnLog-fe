import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const ManagerHome = () => {
  const tileData = [
    { title: 'Grops', description: 'Manage Groups', path: routes.PUBLIC.GROUP },
    { title: 'Subjects', description: 'Manage Subjects', path: routes.PUBLIC.SUBJECT },
    { title: 'Schedules', description: 'Manage all group schedules', path: routes.PUBLIC.SCHEDULES },
    { title: 'Reports', description: 'Manage all reports', path: routes.PUBLIC.REPORTS },
  ];

  return <TileList tileData={tileData} />;
};

export default ManagerHome;
