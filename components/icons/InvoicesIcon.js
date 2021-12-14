// @flow strict
import Svg from './Svg';

type Props = {|
  +width?: number,
  +height?: number,
  +className?: string,
|};

const InvoicesIcon = ({ width = 17, height = 21, ...props }: Props): React$Node => (
  <Svg width={width} height={height} viewBox="0 0 17 21" fill="none" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.99609 0.995117H10.9961L16.9961 6.99512V20.9951L13 18L9 20.9951L5 18L0.996094 20.9951L1.00609 2.99512C1.00609 1.89512 1.89609 0.995117 2.99609 0.995117ZM2.99707 2.99509V16.5L5 15.5049L9 18.5049L13 15.5049L14.9971 16.5V7.99509H9.99707V2.99509H2.99707Z" fill="#99ABB4" />
  </Svg>

);

export default InvoicesIcon;
