// @flow strict
import MuiSvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/styles/withStyles';

const SvgIcon = withStyles({
  root: {
  },
})(MuiSvgIcon);

type Props = {|
  width: number,
  height: number,
|};

const AddFileIcon = (props: Props): $FlowFixMe => (
  <SvgIcon fill="none" viewBox="0 0 24 24" {...props}>
    <g clipRule="evenodd" fill="#1e88e5" fillRule="evenodd">
      <path d="m7 2h6l6 5.4v10.8c0 .99-.9 1.8-2 1.8h-10.01c-1.1 0-1.99-.81-1.99-1.8l.01-14.4c0-.99.89-1.8 1.99-1.8zm.00098 1.99509v14.00001h10.00002v-9.00001h-4v-5zm11.99902 10.00491h-2v3h2zm-3 4h-3v2h3z" />
      <path d="m18 15c-.5523 0-1 .4477-1 1v2h-2c-.5523 0-1 .4477-1 1s.4477 1 1 1h2v2c0 .5523.4477 1 1 1s1-.4477 1-1v-2h2c.5523 0 1-.4477 1-1s-.4477-1-1-1h-2v-2c0-.5523-.4477-1-1-1z" />
    </g>
  </SvgIcon>
);

export default AddFileIcon;
