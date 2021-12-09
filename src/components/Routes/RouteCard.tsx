import React from 'react';
import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

export default function Colored() {
    return (
        <>
            <Card accent="Success">
                <CardHeader>Маршрут</CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col breakPoint={{ xs: 4, sm: 2, md: 1, lg: 1 }}>
                                <img src='/icons/choice-graph.png'/>
                            </Col>
                            <Col breakPoint={{ xs: 12, sm: 6, md: 8, lg: 6 }}>
                                Маршрут 1
                                Маршрут 2
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </>
    );
}
