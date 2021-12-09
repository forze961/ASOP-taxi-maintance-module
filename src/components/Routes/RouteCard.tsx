import React from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

interface RoutesProps {
  num: number;
  endpoints: {
    start: string;
    end: string;
  };
}
const Routes: React.FC<RoutesProps> = ({ num, endpoints }) => {
  return (
    <Card accent="Success" style={{ borderTopColor: '#F17F14', width: 'auto', cursor: 'pointer' }}>
      <CardHeader>
        Маршрут #<b>{num}</b>
      </CardHeader>
      <CardBody>
        <Row style={{ width: '100%' }}>
          <img style={{ paddingTop: '3px' }} height="30px" width="30px" src="/icons/bus.png" />
          <Col breakPoint={{ xs: 1, sm: 1, md: 1, lg: 1 }} style={{ paddingTop: '3px' }}>
            <img src="/icons/route-points.png" />
          </Col>
          <Col breakPoint={{ xs: 9, sm: 9, md: 9, lg: 9 }} style={{ paddingLeft: 0 }}>
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
