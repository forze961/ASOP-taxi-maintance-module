// @flow strict
import { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::focus': {
      outLine: 'none !important',
    },
    [theme.breakpoints.up('xs')]: {
      margin: 25,
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    maxHeight: '100%',
    overflow: 'auto',
    width: 770,
    background: 'white',
    borderRadius: 4,
    outline: 'none !important',
  },
  modalContainerSmall: {
    maxHeight: '100%',
    overflow: 'auto',
    width: 400,
    background: 'white',
    borderRadius: 4,
    outline: 'none !important',
  },
  modalTitle: {
    padding: '0 30px 0 25px',
    height: 65,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#455A64',
    borderBottom: '#F2F0F0 1px solid',
  },
  modalBody: {
    padding: '25px 25px 30px',
  },
  icon: {
    cursor: 'pointer',
    color: '#CED4DA',
    '&:hover': {
      color: '#000',
    },
  },
}));

type Props = {
  +open: boolean,
  +title?: string,
  +bodyClassName?: string,
  +containerClassName?: string,
  +handleClose?: () => void,
  +withoutControls?: boolean,
  +onClick?: (event: SyntheticEvent<*>) => void,
  +children?: React$Element<*>,
  +titleClassName?: string,
  +makeSmall: boolean,
}

const backdropProps = {
  timeout: 500,
};

function CustomModal(props: Props) {
  const classes = useStyles();
  const {
    open, handleClose, children, title, onClick, containerClassName, bodyClassName, withoutControls, titleClassName, makeSmall,
  } = props;

  return (
    <Modal
      onClick={onClick}
      className={classes.modal}
      classes={classes.root}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={backdropProps}
    >
      {withoutControls ? children : (
        <Box className={clsx(makeSmall ? classes.modalContainerSmall : classes.modalContainer, containerClassName)}>
          {title && (
            <Grid container justify="space-between" alignItems="center" className={clsx(classes.modalTitle, titleClassName)}>
              {title && title}
              <CloseIcon className={classes.icon} onClick={handleClose} />
            </Grid>
          )}

          <Grid className={clsx(classes.modalBody, bodyClassName)}>
            {children}
          </Grid>
        </Box>
      )}

    </Modal>
  );
}

CustomModal.defaultProps = {
  onClick: () => {},
  withoutControls: false,
};

export default memo<Props>(CustomModal);
