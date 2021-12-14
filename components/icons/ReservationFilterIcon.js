// @flow strict
import { memo } from 'react';
import Svg from './Svg';

type Props = {|
  +width: number,
  +height: number,
  +className?: string,
  +style?: $Shape<CSSStyleDeclaration>,
|};

function StatisticsIcon(props: Props) {
  const id = `StatisticsIcon-${Math.random()}`;
  return (
    <Svg viewBox="0 0 18 18" {...props}>
      <path
        fill="#1E88E5"
        d="M11.968 6.032A4.182 4.182 0 009 4.8V9l-2.968 2.968a4.208 4.208 0 005.943 0 4.193 4.193 0 00-.007-5.936zM9 2C5.136 2 2 5.136 2 9s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7zm0 12.6A5.598 5.598 0 013.4 9c0-3.094 2.506-5.6 5.6-5.6s5.6 2.506 5.6 5.6-2.506 5.6-5.6 5.6z"
      />
      <mask
        id={id}
        width="7"
        height="7"
        x="11"
        y="11"
        fill="#000"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M11 11H18V18H11z" />
        <path
          fillRule="evenodd"
          d="M15 12h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill="#1E88E5"
        fillRule="evenodd"
        d="M15 12h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M14 12v-1h-1v1h1zm1 0h1v-1h-1v1zm-1 2v1h1v-1h-1zm-2 0v-1h-1v1h1zm0 1h-1v1h1v-1zm2 0h1v-1h-1v1zm0 2h-1v1h1v-1zm1 0v1h1v-1h-1zm0-2v-1h-1v1h1zm2 0v1h1v-1h-1zm0-1h1v-1h-1v1zm-2 0h-1v1h1v-1zm-1-1h1v-2h-1v2zm1 1v-2h-2v2h2zm-3 1h2v-2h-2v2zm1 0v-1h-2v1h2zm1-1h-2v2h2v-2zm1 3v-2h-2v2h2zm0-1h-1v2h1v-2zm-1-1v2h2v-2h-2zm3-1h-2v2h2v-2zm-1 0v1h2v-1h-2zm-1 1h2v-2h-2v2zm-1-3v2h2v-2h-2z"
        mask={`url(#${id})`}
      />
    </Svg>
  );
}

export default (memo<Props>(StatisticsIcon): React$AbstractComponent<Props, mixed>);
