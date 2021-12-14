import { makeStyles } from '@material-ui/core/styles';
import TabsNav from '../StatsNav';

const useStyles = makeStyles(() => ({
  menuOpen: {
    paddingLeft: '320px',
  },
  menuClosed: {
    paddingLeft: '50px',
  },
}));

// eslint-disable-next-line react/prop-types
export default function EnhancedTable({ menuFilter, menuOpen, category }) {
  const classes = useStyles();

  return (
    <div className="wrapper">
      <main>
        <div className={`page-container ${menuOpen ? classes.menuOpen : classes.menuClosed}`}>
          <TabsNav menuFilter={menuFilter} menuOpen={menuOpen} category={category} />
        </div>
      </main>
    </div>
  );
}
