// @flow strict
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
|};

const CalendarIcon = (props: Props): React$Node => (
  <Svg viewBox=" 0 0 16 18" {...props}>
    <path
      d="M1.77778 18H14.2222C15.2027 18 16 17.1927 16 16.2V3.79219C16 2.79949 15.2027 1.99219 14.2222 1.99219H13V0H11V1.99219H5V0H3V1.99219H1.77778C0.797333 1.99219 0 2.79949 0 3.79219V16.2C0 17.1927 0.797333 18 1.77778 18ZM2 4.00005H14V6.00005H2V4.00005Z"
      fill="#CED4DA"
    />
  </Svg>
);

export default CalendarIcon;
