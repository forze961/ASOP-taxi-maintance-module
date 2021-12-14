// @flow strict
import SvgIcon from '@material-ui/core/SvgIcon';

const CalendarIcon1 = (props: $FlowFixMe): $FlowFixMe => (
  <SvgIcon fill="none" height="16" width="16" viewBox=" 0 0 16 16" {...props}>
    <path d="M10.5 3.5H11H12C12.1284 3.5 12.2404 3.55702 12.3343 3.67843C12.4338 3.8071 12.5 3.99698 12.5 4.2V4.5H12H3H2.5V4.2C2.5 3.99698 2.56616 3.8071 2.6657 3.67843C2.75961 3.55702 2.87163 3.5 3 3.5H4H4.5H5H10H10.5ZM12 6.5H12.5V12.9C12.5 13.2258 12.2303 13.5 11.8889 13.5H3.11111C2.76973 13.5 2.5 13.2258 2.5 12.9V6.5H3H12Z" stroke="#455A64" />
    <mask id={`path-3-outside-1-${props.id}`} maskUnits="userSpaceOnUse" x="10" y="8" width="4" height="7" fill="black">
      <rect fill="white" x="10" y="8" width="4" height="7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 9H12V10H11V11H12V14H13V9Z" />
    </mask>
    <path fillRule="evenodd" clipRule="evenodd" d="M13 9H12V10H11V11H12V14H13V9Z" fill="#455A64" />
    <path d="M12 9V8H11V9H12ZM13 9H14V8H13V9ZM12 10V11H13V10H12ZM11 10V9H10V10H11ZM11 11H10V12H11V11ZM12 11H13V10H12V11ZM12 14H11V15H12V14ZM13 14V15H14V14H13ZM12 10H13V8H12V10ZM13 10V9H11V10H13ZM11 11H12V9H11V11ZM12 11V10H10V11H12ZM12 10H11V12H12V10ZM13 14V11H11V14H13ZM13 13H12V15H13V13ZM12 9V14H14V9H12Z" fill="white" mask={`url(#path-3-outside-1-${props.id})`} />
  </SvgIcon>
);

export default CalendarIcon1;
