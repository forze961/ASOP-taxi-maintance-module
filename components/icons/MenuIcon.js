// @flow strict
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {|
  +width?: number,
  +height?: number,
|};

const MenuIcon = (props: Props): $FlowFixMe => (
  <SvgIcon fill="none" viewBox="0 0 18 18" {...props}>
    <rect x="3" y="4" width="12" height="2" fill="#455A64" />
    <rect x="3" y="8" width="8" height="2" fill="#455A64" />
    <rect x="3" y="12" width="12" height="2" fill="#455A64" />
  </SvgIcon>
);

export default MenuIcon;
