// @flow strict
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
|};

const PaperIcon = (props: Props): React$Node => (
  <Svg viewBox=" 0 0 22 22" {...props}>
    <path d="M12.75 2H5.75C4.7875 2 4.00875 2.81 4.00875 3.8L4 20L7.50342 17.3044L11.0034 20L14.5034 17.3044L18 20V7.4L12.75 2Z" fill="#CED4DA" />
  </Svg>
);

export default PaperIcon;
