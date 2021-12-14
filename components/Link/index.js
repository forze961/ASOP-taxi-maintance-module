// @flow strict
import { useCallback } from 'react';
import { Link as MUILink } from '@material-ui/core';
import { useRouter } from 'next/router';

type Props = {
  +href: string,
  +onClick?: () => void,
  ...
};

const Link = ({ href, onClick, ...props }: Props): $FlowFixMe => {
  const router = useRouter();
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
      return;
    }
    router.push(href);
  }, [router]);

  return <MUILink {...props} href={href} onClick={handleClick} />;
};

export default Link;
