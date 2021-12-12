import React from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import { useRouter } from 'next/router';

interface RoutesProps {
  num: number;
  tariff: string;
  endpoints: {
    start: string;
    end: string;
  };
}
const Routes: React.FC<RoutesProps> = ({ num, tariff, endpoints }) => {
  const router = useRouter();

  return (
    <Card accent="Success" style={{ borderTopColor: '#F17F14', width: 'auto', cursor: 'pointer' }}>
      <CardHeader style={{ padding: '0.7rem' }}>
        Маршрут #<b>{num}</b> | Тариф: <b>{tariff}</b>
      </CardHeader>
      <CardBody style={{ padding: '0.7rem' }} onClick={() => router.push(`/route/${num}`)}>
        <Row style={{ width: '100%' }}>
          <img style={{ paddingTop: 'px', paddingLeft: '5px' }} height="30px" width="35px" src="/icons/bus.png" />
          <Col breakPoint={{ xs: 2, sm: 2, md: 2, lg: 2 }} style={{ paddingTop: '3px' }}>
            <img src="/icons/route-points.png" />
          </Col>
          <Col breakPoint={{ xs: 8, sm: 8, md: 8, lg: 8 }} style={{ paddingLeft: 0 }}>
            <div>
              <b>{endpoints.start}</b>
              <p>
                <b>{endpoints.end}</b>
              </p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Routes;
