// @flow strict
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {|
  +width?: number,
  +height?: number,
|};

const CompaniesIcon = (props: Props): $FlowFixMe => (
  <SvgIcon fill="none" viewBox="0 0 22 22" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M13 4H9C7.89543 4 7 4.89543 7 6V7H3.5C2.67157 7 2 7.67157 2 8.5V12H9C9 11.4477 9.44772 11 10 11H12C12.5523 11 13 11.4477 13 12H20V8.5C20 7.67157 19.3284 7 18.5 7H15V6C15 4.89543 14.1046 4 13 4ZM13 6H9V7H13V6ZM13 13H20V17.5C20 18.3284 19.3284 19 18.5 19H3.5C2.67157 19 2 18.3284 2 17.5V13H9C9 13.5523 9.44772 14 10 14H12C12.5523 14 13 13.5523 13 13Z" fill="#CED4DA" />
  </SvgIcon>
);

export default CompaniesIcon;
