import React from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import FlipCard from '@paljs/ui/FlipCard';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

interface TripsProps {
  route: string;
  name: string;
  time: string;
  stations: [{ name: string }];
}
const Trips: React.FC<TripsProps> = ({ route, name, time, stations }) => {
  return (
    <FlipCard>
      <Card accent="Success" style={{ borderTopColor: '#F17F14', width: 'auto', cursor: 'pointer' }}>
        <CardHeader style={{ padding: '0.7rem' }}>
          Рейс #<b>{name}</b> | Початок: <b>{time}</b>
        </CardHeader>
        <CardBody style={{ padding: '0.7rem' }}>
          <Row style={{ width: '100%' }}>
            <Col breakPoint={{ xs: 2, sm: 2, md: 2, lg: 2 }} style={{ paddingTop: '3px' }}>
              <img style={{ paddingTop: '3px' }} height="30px" width="30px" src="/icons/bus.png" />
            </Col>
            <Col breakPoint={{ xs: 10, sm: 10, md: 10, lg: 10 }} style={{ paddingLeft: 0 }}>
              <div>
                Маршрут:{route}
                <Row style={{ width: '100%' }}>
                  <>
                    <Col breakPoint={{ xs: 1, sm: 1, md: 1, lg: 1 }} key={`${stations[0]?.name}point`}>
                      <img style={{ paddingTop: '3px' }} src="/icons/station-point.png" />
                    </Col>
                    <Col breakPoint={{ xs: 9, sm: 9, md: 9, lg: 9 }} key={`${stations[0]?.name}name`}>
                      <b>{stations[0]?.name}</b>
                    </Col>
                  </>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card accent="Success" style={{ borderTopColor: '#F17F14', width: 'auto', cursor: 'pointer' }}>
        <CardHeader style={{ padding: '0.7rem' }}>
          Рейс #<b>{name}</b> | <b>Зупинки</b>:
        </CardHeader>
        <CardBody style={{ padding: '0.7rem' }}>
          <Row style={{ width: '100%' }}>
            {stations?.map((station) => (
              <>
                <Col breakPoint={{ xs: 1, sm: 1, md: 1, lg: 1 }} key={`${station.name}point`}>
                  <img style={{ paddingTop: '3px' }} src="/icons/station-point.png" />
                </Col>
                <Col breakPoint={{ xs: 11, sm: 11, md: 11, lg: 11 }} key={`${station.name}name`}>
                  {station.name}
                </Col>
              </>
            ))}
          </Row>
        </CardBody>
      </Card>
    </FlipCard>
  );
};

export default Trips;
