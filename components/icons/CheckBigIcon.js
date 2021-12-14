// @flow strict
import Svg from './Svg';

type Props = {|
  +width?: number,
  +height?: number,
|};

const CheckBigIcon = ({ width = 180, height = 180, ...props }: Props): React$Node => (
  <Svg width={width} height={height} {...props} viewBox="0 0 180 180" fill="none">
    <g filter="url(#filter0_dd)">
      <circle cx="90" cy="80" r="60" fill="#58DB55" />
    </g>
    <rect x="70.4854" y="70" width="30" height="12" rx="4" transform="rotate(45 70.4854 70)" fill="white" />
    <rect width="50" height="12" rx="4" transform="matrix(-0.707107 0.707107 0.707107 0.707107 110.485 56)" fill="white" />
    <defs>
      <filter id="filter0_dd" x="0" y="0" width="180" height="180" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 0.858824 0 0 0 0 0.333333 0 0 0 0.3 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.378617 0 0 0 0 0.942187 0 0 0 0 0.365711 0 0 0 0.3 0" />
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
      </filter>
    </defs>
  </Svg>
);

export default CheckBigIcon;
