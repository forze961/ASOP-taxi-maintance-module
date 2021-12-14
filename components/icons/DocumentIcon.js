// @flow strict
import MuiSvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/styles/withStyles';

const SvgIcon = withStyles({
  root: {
    height: 30,
  },
})(MuiSvgIcon);

const DocumentsIcon = (props: $FlowFixMe): $FlowFixMe => (
  <SvgIcon width="20" height="20" fill="none" viewBox="-6 -4 20 20" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 4L4 0H10V14H0V4Z" fill="#455A64" />
    <path d="M4 1H9V13H1V4H4V1Z" fill="white" />
  </SvgIcon>
);

export default DocumentsIcon;
