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
        d="M14.828 5.172a4 4 0 10-5.656 5.656 4 4 0 005.656-5.656zM16 14.535c-1.177-.34-2.543-.535-4-.535-4.42 0-8 1.79-8 4v2h16-7v-3h3v-2.465zM20 18c0-1.481-1.608-2.774-4-3.465 2.392.691 4 1.984 4 3.465z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 15h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default (memo<Props>(Icon): React$AbstractComponent<Props, mixed>);
