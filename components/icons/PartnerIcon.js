// @flow strict
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {|
  +width?: number,
  +height?: number,
|};

const PartnerIcon = (props: Props): $FlowFixMe => (
  <SvgIcon fill="none" viewBox="0 0 22 22" {...props}>
    <path d="M11 3C12.0609 3 13.0783 3.42143 13.8284 4.17157C14.5786 4.92172 15 5.93913 15 7C15 8.06087 14.5786 9.07828 13.8284 9.82843C13.0783 10.5786 12.0609 11 11 11C9.93913 11 8.92172 10.5786 8.17157 9.82843C7.42143 9.07828 7 8.06087 7 7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3ZM11 13C15.42 13 19 14.79 19 17V19H3V17C3 14.79 6.58 13 11 13Z" fill="#CED4DA" />
  </SvgIcon>
);

export default PartnerIcon;
