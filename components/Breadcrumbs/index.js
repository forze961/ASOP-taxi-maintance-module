// @flow strict
// eslint-disable-next-line import/no-unresolved
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '../Link';

export default function BreadcrumbsLayout({ links }: $FlowFixMe) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        Home
      </Link>
      {links}
    </Breadcrumbs>
  );
}
