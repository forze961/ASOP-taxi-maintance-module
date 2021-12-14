// @flow strict
import { memo } from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.742 2h-4.25C4.668 2 4 2.607 4 3.35v10.3c0 .742.668 1.35 1.492 1.35H12.5c.69 0 1.276-.426 1.448-1H14v-.35c0 .12-.018.238-.052.35H12v1h-2v-2h2v-2h2V5.55L9.742 2z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 12h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default (memo<{||}>(Icon): React$AbstractComponent<{||}, mixed>);
