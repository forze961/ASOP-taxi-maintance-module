// @flow strict
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  divider: {
    marginBottom: 24,
  },
});

type Props = {||};

const Divider24 = (props: Props) => {
  const classes = useStyles();
  return (
    <Divider className={classes.divider} {...props} />
  );
};

export default Divider24;
