// @flow strict
import { PureComponent } from 'react';

type Props = {|
  +children: React$Element<*> | Array<React$Element<*>>,
  +viewBox?: string,
  +style?: $Shape<CSSStyleDeclaration>,
  +className?: string,
  +fill?: string,
  +width?: number,
  +height?: number,
|};

class Svg extends PureComponent<Props> {
  static defaultProps: {|height: number, style: {...}, viewBox: string, width: number|} = {
    viewBox: '0 0 16 16',
    style: {},
    width: 20,
    height: 20,
  }

  render(): React$Element<"svg"> {
    const {
      children,
      viewBox,
      style,
      className,
      width,
      height,
      fill,
    } = this.props;

    return (
      <svg
        viewBox={viewBox}
        style={{ verticalAlign: 'bottom', ...(style || {}) }}
        className={className}
        width={width}
        height={height}
        fill={fill}
      >
        {children}
      </svg>
    );
  }
}

export default Svg;
