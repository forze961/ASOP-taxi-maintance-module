import Fab from '@material-ui/core/Fab';
import { KeyboardArrowLeftRounded } from '@material-ui/icons';
import Router from 'next/router';

export default function BackToDefault({ backUrl = '' }) {
  return (
    <>
      <Fab
        color="primary"
        size="small"
        aria-label="click to main menu"
        onClick={() => {
          if (backUrl === '') Router.push('/main/3');
          else Router.push(`/${backUrl.replace('-', '/')}`);
        }}
      >
        <KeyboardArrowLeftRounded />
      </Fab>
    </>
  );
}
