// @flow strict
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {|
  +id: string,
  +width: number,
  +height: number,
|};

const PaymentIcon = ({ id, ...props }: Props): $FlowFixMe => (
  <SvgIcon fill="none" viewBox="0 0 18 18" {...props}>
    <clipPath id={id}>
      <path d="M0 0h18v18H0z" />
    </clipPath>
    <mask id={id + id} width="7" height="7" x="11" y="11" fill="#000" maskUnits="userSpaceOnUse">
      <path fill="#fff" d="M11 11h7v7h-7z" />
      <path fillRule="evenodd" d="M15 12h-1v2h-2v1h2v2h1v-2h2v-1h-2z" clipRule="evenodd" />
    </mask>
    <g clipPath={`url(#${id})`}>
      <path
        fill="#1e88e5"
        d="M10.66 12.98a3.6 3.6 0 002.83-1.32l1.65 1.53a5.19 5.19 0 01-1.98 1.49c-.78.34-1.66.51-2.63.51-.92 0-1.79-.16-2.59-.5a5.64 5.64 0 01-3.21-3.51H2.92V9.83h1.57a4.26 4.26 0 010-.86H2.92V7.62h1.8A5.47 5.47 0 017.95 4.1c.8-.33 1.67-.5 2.6-.5.96 0 1.84.18 2.62.52.79.34 1.45.83 1.98 1.47L13.5 7.13a3.66 3.66 0 00-2.83-1.31c-.7 0-1.33.16-1.89.48s-.98.76-1.28 1.32h4.05v1.35H7.1a4.26 4.26 0 000 .86h4.45v1.35H7.5c.3.56.73 1 1.28 1.32s1.19.48 1.9.48z"
      />
      <path
        fill="#1e88e5"
        fillRule="evenodd"
        d="M15 12h-1v2h-2v1h2v2h1v-2h2v-1h-2z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M14 12v-1h-1v1zm1 0h1v-1h-1zm-1 2v1h1v-1zm-2 0v-1h-1v1zm0 1h-1v1h1zm2 0h1v-1h-1zm0 2h-1v1h1zm1 0v1h1v-1zm0-2v-1h-1v1zm2 0v1h1v-1zm0-1h1v-1h-1zm-2 0h-1v1h1zm-1-1h1v-2h-1zm1 1v-2h-2v2zm-3 1h2v-2h-2zm1 0v-1h-2v1zm1-1h-2v2h2zm1 3v-2h-2v2zm0-1h-1v2h1zm-1-1v2h2v-2zm3-1h-2v2h2zm-1 0v1h2v-1zm-1 1h2v-2h-2zm-1-3v2h2v-2z"
        mask={`url(#${id + id})`}
      />
    </g>
  </SvgIcon>
);

export default PaymentIcon;
