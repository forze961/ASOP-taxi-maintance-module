/* eslint-disable prefer-const */
import Iframe from 'react-iframe';
import ScrollTop from '../returnTop';

export default function ServiceIframe({
  menuOpen, url, sizeClient, id,
}) {
  return (
    <>
      <div id="back-to-top-anchor" style={{ maxHeight: '1px' }} />
      <Iframe
        url={`${process.env.BACKEND_SERVICE}${url}`}
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
