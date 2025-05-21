import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const tileData = [
    { title: t('superadmin.university'), path: routes.PUBLIC.UNIVERSITY },
    { title: t('superadmin.profile'), path: routes.PUBLIC.PROFILE },
  ];

  return <TileList tileData={tileData} />;
};

export default Home;
