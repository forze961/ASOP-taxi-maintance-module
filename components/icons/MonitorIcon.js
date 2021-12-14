// @flow strict
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
|};
const MonitorIcon = (props: Props): React$Node => (
  <Svg viewBox="0 0 14 14" fill="none" {...props}>
    <path d="M13 9H1V1H13V9ZM12.7273 0H1.27273C0.566364 0 0 0.623 0 1.4V9.8C0 10.1713 0.134091 10.5274 0.372773 10.7899C0.611456 11.0525 0.935179 11.2 1.27273 11.2H5.72727L4.45455 13.3V14H9.54545V13.3L8.27273 11.2H12.7273C13.0648 11.2 13.3885 11.0525 13.6272 10.7899C13.8659 10.5274 14 10.1713 14 9.8V1.4C14 1.0287 13.8659 0.672601 13.6272 0.41005C13.3885 0.1475 13.0648 0 12.7273 0Z" fill="#1E88E5" />
  </Svg>
);

export default MonitorIcon;
