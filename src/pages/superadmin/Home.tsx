import { routes } from '@/routes';

import TileList from '@/components/Lists/TileList';

const Home = () => {
  const tileData = [
    { title: 'Universities', description: 'See all uni', path: routes.PUBLIC.UNIVERSITY },
    { title: 'Profile', description: 'View and edit your profile', path: routes.PUBLIC.PROFILE },
  ];

  return <TileList tileData={tileData} />;
};

export default Home;
