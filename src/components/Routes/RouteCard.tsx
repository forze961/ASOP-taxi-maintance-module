import React from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

export default function Colored() {
    return (
        <>
            <Card accent="Success" style={{borderTopColor: '#F17F14', width: 'auto'}}>
                <CardHeader>Маршрут #1</CardHeader>
                <CardBody>
                    <Row center={'xs'}>
                        <img style={{paddingTop: '3px'}} height='30px' width='30px' src='/icons/bus.png'/>
                        <Col breakPoint={{ xs: 2, sm: 2, md: 2, lg: 3 }} style={{paddingTop: '3px'}}>
                            <img src='/icons/route-points.png'/>
                        </Col>
                        <Col breakPoint={{ xs: 4, sm: 6, md: 8, lg: 6 }} style={{paddingLeft: 0}}>
                            <div>
                                <b>Маршрут 1</b>
                                <b><p>Маршрут 24124214215555</p></b>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
}
