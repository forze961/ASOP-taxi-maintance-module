import withSession from '../../lib/session';
import query from 'axios';

/**
 * Endpoint for getting data from duty service for today
 */
export default withSession(async (req: any, res: any) => {
  if (req.session) {
    const { userCar } = req.session.get('user');
    if (req.method === 'POST' && userCar != 0) {
      const arrDuties = [];

      const { data: body }: any = await query.post(`http://193.23.225.178:3125/taximotor/${userCar}`, {
        responseType: 'json',
      });

      if (body && body.Route !== '') {
        const endpoints = body.NameRoute.split('-');
        const trips = [];

        if (body.tripCount && Number(body.tripCount) > 0) {
          for (let i = 0; i <= Number(body.tripCount); i++)
            trips.push({
              trip: `${body.Route || 0}_1_${i + 1}`,
              time: '',
            });
        } else {
          trips.push({ trip: `0_0_0`, time: '' });
        }

        const prepareDuty = {
          num: body.Route || '',
          tariff: `${body.Tariff || 0} ₴`,
          endpoints: {
            start: endpoints[0] || '',
            end: endpoints[1] || '',
          },
          trips: trips,
          stations: [
            {
              name: endpoints[0],
            },
            {
              name: endpoints[1],
            },
          ],
          carrier: Number(body.FiliaID),
        };
        arrDuties.push(prepareDuty);
      }
      return arrDuties.length > 0 ? res.status(200).send(arrDuties) : res.status(404).send('');
    }
  }
  return res.status(404).send('');
});
