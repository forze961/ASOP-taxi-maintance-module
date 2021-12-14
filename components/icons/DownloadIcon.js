// @flow strict
import Svg from './Svg';

type Props = {|
  +width?: number,
  +height?: number,
|};

const DownloadIcon = ({ width = 28, height = 28, ...props }: Props): React$Node => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 28 28" {...props}>
    <path d="M14 6.125V17.5M14 17.5L18.375 13.125M14 17.5L9.625 13.125" stroke="#CED4DA" strokeWidth="2" />
    <path d="M7 16.625V19C7 20.1046 7.89543 21 9 21H19C20.1046 21 21 20.1046 21 19V16.625" stroke="#CED4DA" strokeWidth="2" />
  </Svg>

);

export default DownloadIcon;
