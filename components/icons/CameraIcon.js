// @flow strict
import { memo } from 'react';
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
|};

const CameraIcon = (props: Props) => (
  <Svg fill="none" viewBox="0 0 18 18" {...props}>
    <path
      fill="#CBE7FF"
      fillRule="evenodd"
      d="M2.1 17.9a2 2 0 01-2-2V2.1a2 2 0 012-2h13.8a2 2 0 012 2v13.8a2 2 0 01-2 2H2.1zM14.2 2.2v1.6h1.6V2.2h-1.6zM9 14a5 5 0 100-9.8 5 5 0 000 9.8zm0-2A3 3 0 109 6a3 3 0 000 6z"
      clipRule="evenodd"
    />
  </Svg>
);

export default (memo<Props>(CameraIcon): React$AbstractComponent<Props, mixed>);
