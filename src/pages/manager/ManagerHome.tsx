import { useTranslation } from 'react-i18next';

import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const ManagerHome = () => {
  const { t } = useTranslation();

  const tileData = [
    { title: t('manager.group'), path: routes.PUBLIC.GROUP },
    { title: t('manager.subject'), path: routes.PUBLIC.SUBJECT },
    { title: t('manager.schedule'), path: routes.PUBLIC.SCHEDULES },
    { title: t('manager.report'), path: routes.PUBLIC.REPORTS },
  ];

  return <TileList tileData={tileData} />;
};

export default ManagerHome;
