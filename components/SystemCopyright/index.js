import { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        ТОВ «ЕПАРКГРАД»,
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default memo(Copyright);
