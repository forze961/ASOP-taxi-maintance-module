// @flow strict
import { memo } from 'react';

type Props = {
  className?: string,
}

function Icon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.75 8h3.75c.827 0 1.5.673 1.5 1.5v2c0 .827-.673 1.5-1.5 1.5h-6v-.375a.375.375 0 00-.375-.375h-2.25a.375.375 0 00-.376.375V13h-6c-.827 0-1.5-.673-1.5-1.5v-2C3 8.673 3.673 8 4.5 8h3.75v-.5c0-.827.673-1.5 1.5-1.5h4.5c.828 0 1.5.673 1.5 1.5V8zm-6 0h4.5V7h-4.5v1zm3.75 6h6c.352 0 1.5-.01 1.5-.01V20H4.5c-.828 0-1.5-.673-1.5-1.5v-4.51a.375.375 0 01.601-.298c.267.202.577.308.899.308h6v1.125c0 .207.168.375.375.375h2.25a.375.375 0 00.375-.375V14zm7.5 0h-4v3h-3v3h7v-6z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20 15h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default (memo<Props>(Icon): React$AbstractComponent<Props, mixed>);
