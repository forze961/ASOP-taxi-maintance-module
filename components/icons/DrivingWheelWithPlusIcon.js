// @flow strict
import { memo } from 'react';
import Svg from './Svg';

type Props = {|
  +className?: string,
|};

function Icon(props: Props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 12C2 6.478 6.478 2 12 2c5.523 0 10 4.478 10 10a10.044 10.044 0 01-.2 2h-2.572a7.445 7.445 0 00.272-2c-3.416 0-6.182 3.291-6.24 7.373a7.5 7.5 0 001.74-.52V21h1.364c-1.319.64-2.8 1-4.364 1-5.522 0-10-4.477-10-10zm17.041-2.5c-1.038-2.904-3.787-5-7.041-5-3.254 0-6.003 2.096-7.041 5H19.04zM10.75 12a1.25 1.25 0 102.5 0 1.25 1.25 0 00-2.5 0zM4.5 12c3.416 0 6.182 3.291 6.24 7.373C7.205 18.767 4.5 15.703 4.5 12z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21 15h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default (memo<Props>(Icon): React$AbstractComponent<Props, mixed>);
