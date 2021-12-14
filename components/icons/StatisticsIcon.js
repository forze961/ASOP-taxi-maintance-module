// @flow strict
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
|};

const StatisticsIcon = (props: Props): React$Node => (
  <Svg viewBox="0 0 13 15" {...props}>
    <path
      clipRule="evenodd"
      d="m10 1c0-.552285.4477-1 1-1h1c.5523 0 1 .447715 1 1v13c0 .5523-.4477 1-1 1h-1c-.5523 0-1-.4477-1-1zm-5 10c0-.5523.44772-1 1-1h1c.55228 0 1 .4477 1 1v3c0 .5523-.44772 1-1 1h-1c-.55228 0-1-.4477-1-1zm-4-6c-.552285 0-1 .44772-1 1v8c0 .5523.447715 1 1 1h1c.55228 0 1-.4477 1-1v-8c0-.55228-.44772-1-1-1z"
      fill="#CED4DA"
      fillRule="evenodd"
    />
  </Svg>
);

export default StatisticsIcon;
