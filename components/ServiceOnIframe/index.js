/* eslint-disable prefer-const */
import Iframe from 'react-iframe';
import ScrollTop from '../returnTop';
import useUser from '../../lib/useUser';

export default function ServiceIframe({
  menuOpen, url, isAuth, sizeClient, id,
}) {
  const { user } = useUser();

  return (
    <>
      <div id="back-to-top-anchor" style={{ maxHeight: '1px' }} />
      <Iframe
        url={isAuth ? `${process.env.BACKEND_SERVICE}${url}${user?.login?.api_token}` : `${process.env.BACKEND_SERVICE}${url}`}
        width={!menuOpen ? sizeClient.width - 155 : sizeClient.width - 485}
        height={sizeClient.height - 200}
        id={`iframe-${id}`}
        display="initial"
        position="relative"
      />
      <ScrollTop />
    </>
  );
}
