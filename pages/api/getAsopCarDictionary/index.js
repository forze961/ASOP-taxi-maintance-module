import withSession from '../../../lib/session';
import isUserHasRights from '../../../lib/isUserHasRights';

import { saveCarsDict, getCarsDict } from '../../../lib/postgress';

// TODO: Отложено (справочник подвижніх единиц для меньшей стоимости запроса по машине за день).
export default withSession(async (req, res) => {
  try {
    const userData = req.session.get('user');
    const { status, user } = await isUserHasRights(userData);

    if (!status) {
      res.status(401).end();
      return;
    }

    if (req.method === 'POST') {
      const dataObj = req.body;

      const result = await saveCarsDict(dataObj);

      res.status(200).json(result);
    } else {
      const findCar = req.query.car;

      console.log(findCar);

      if (findCar) {
        const result = await getCarsDict(findCar);
        res.status(200).json(result);
      } else {
        res.status(200).json([]);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});
