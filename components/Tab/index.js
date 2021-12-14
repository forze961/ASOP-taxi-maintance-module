// @flow strict
import { memo } from 'react';
import MuiTab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import CompletedIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(({ palette }) => ({
  completedTab: {
    color: palette.success.main,
    '&.Mui-selected': {
      color: palette.success.main,
    },
  },
}));

const StyledTab = withStyles({
  wrapper: {
    textTransform: 'none',
    minHeight: 65,
    display: 'flex',
    flexDirection: 'row',
    '& .MuiSvgIcon-root': {
      marginLeft: 7,
      marginRight: 7,
    },
    fontWeight: 'bold',
  },
  root: {
    maxWidth: 230,
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
})(MuiTab);

/* eslint-disable react/require-default-props */
type Props = {
  isCompleted?: boolean,
  label?: React$Node,
  icon?: React$Node,
  classes?: $FlowFixMe,
}

const Tab = ({
  isCompleted, label = '', icon = null, classes, ...props
}: Props) => {
  const tabClasses = useStyles();
  const isExtraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <StyledTab
      {...props}
      classes={{ wrapper: clsx(isCompleted && tabClasses.completedTab), ...classes }}
      label={(
        <>
          {!isExtraSmall && icon}
          {label}
          {!isExtraSmall && isCompleted && <CompletedIcon />}
        </>
    )}
    />
  );
};

export default (memo<Props>(Tab): React$AbstractComponent<Props, mixed>);
