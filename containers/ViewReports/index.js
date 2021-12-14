// @flow strict
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReportsTable from '../../components/ReportsTable';
import SideMenu from '../../components/SideMenu';
import AppBar from '../../components/AppBar';

export default function ViewReportContainer({ category }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  // Set default menu category from main page choised
  const [menuFilter, setMenuFilter] = useState(Number(router.query?.category - 1) || 0);

  const handleOnChoice = (value) => {
    router.push(`/main/${Number(value) + 1}`, undefined, { shallow: true });
    setMenuFilter(value);
  };

  useEffect(() => {
    setMenuFilter(Number(router.query?.category - 1));
  }, [router]);

  return (
    <>
      <SideMenu title="KSC" menuFilter={menuFilter} onChoice={handleOnChoice} userName="" open={menuOpen} close={() => { setMenuOpen(false); }} />
      <AppBar open={menuOpen} onOpenMenu={() => { setMenuOpen(!menuOpen); }} />
      <ReportsTable initSize={10} initPage={0} menuFilter={menuFilter} menuOpen={menuOpen} category={category} />
    </>
  );
}
