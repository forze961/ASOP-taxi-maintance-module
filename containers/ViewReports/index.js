// @flow strict
import { useState } from 'react';
import ReportsTable from '../../components/ReportsTable';
import SideMenu from '../../components/SideMenu';
import AppBar from '../../components/AppBar';

export default function ViewReportContainer({ category }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Set default menu category from main page choised
  const [menuFilter, setMenuFilter] = useState(0);

  const handleOnChoice = (value) => {
    setMenuFilter(value);
  };

  return (
    <>
      <SideMenu title="KSC" menuFilter={menuFilter} onChoice={handleOnChoice} userName="" open={menuOpen} close={() => { setMenuOpen(false); }} />
      <AppBar open={menuOpen} onOpenMenu={() => { setMenuOpen(!menuOpen); }} />
      <ReportsTable initSize={10} initPage={0} menuFilter={menuFilter} menuOpen={menuOpen} category={category} />
    </>
  );
}
