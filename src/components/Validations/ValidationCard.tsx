import React from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

interface ValidationProps {
  num: number;
  trip: string;
  count: number;
  isCurTrip: boolean;
}
const Validation: React.FC<ValidationProps> = ({ num, trip, count, isCurTrip }) => {
  return (
    <Card
      accent="Success"
      style={{ borderTopColor: !isCurTrip ? '#F17F14' : 'green', width: 'auto', cursor: 'pointer' }}
    >
      <CardHeader style={{ padding: '0.7rem' }}>
        Маршрут #<b>{num}</b> | Рейс: <b>{trip}</b> {isCurTrip && '(Поточний)'}
      </CardHeader>
      <CardBody style={{ padding: '0.7rem' }}>
        <Row style={{ width: '100%' }}>
          <Col breakPoint={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
            <img
              style={{ paddingTop: 'px', paddingLeft: '5px' }}
              height="30px"
              width="35px"
              src="/icons/validations.png"
            />
          </Col>
          <Col breakPoint={{ xs: 8, sm: 8, md: 8, lg: 8 }} style={{ paddingLeft: 0, paddingTop: '5px' }}>
            <div>
              Кількість валідацій: <b>{count}</b>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Validation;
