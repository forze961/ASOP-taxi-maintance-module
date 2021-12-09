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
    <>
      <Card accent="Success" style={{ borderTopColor: '#F17F14', width: 'auto', cursor: 'pointer' }}>
        <CardHeader>
          Маршрут #<b>{num}</b>
        </CardHeader>
        <CardBody>
          <Row center={'xs'}>
            <img style={{ paddingTop: '3px' }} height="30px" width="30px" src="/icons/bus.png" />
            <Col style={{ paddingTop: '3px' }}>
              <img src="/icons/route-points.png" />
            </Col>
            <Col style={{ paddingLeft: 0 }}>
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
    </>
  );
};

export default Routes;
