import { IconButton } from '@material-ui/core';
import { Close as IconClose } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose />
    </IconButton>
  );
}

export default SnackbarCloseButton;
