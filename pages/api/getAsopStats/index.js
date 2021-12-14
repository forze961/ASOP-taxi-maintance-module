import withSession from '../../../lib/session';
import isUserHasRights from '../../../lib/isUserHasRights';

import {
  getCountWorkClassification,
  getCountWorkClassificationEachFillial,
  getCountWorkClassificationEachRoute,
  getCountWorkClassificationEachFillialForAlarm,
} from '../../../lib/asopWorkClassification';
import { getJsonDataByFilter, getJsonDataLastForAlarms } from '../../../lib/postgress';

export default withSession(async (req, res) => {
  try {
    const userData = req.session.get('user');
    const { status, user } = await isUserHasRights(userData);

    if (req.method === 'POST') {
      const filterObj = req.body.filter;
      const typePeriod = req.body.type;

      // Temporary open access to alarms service
      if (!status && typePeriod !== 'filliesAlarm') {
        res.status(401).end();
        return;
      }

      let result = [];

      if (typePeriod !== 'filliesAlarm') result = await getJsonDataByFilter(filterObj);

      let getCountResult;

      switch (typePeriod) {
        case 'all': {
          getCountResult = result ? getCountWorkClassification(result) : {};
          break;
        }
        case 'fillies': {
          getCountResult = result ? getCountWorkClassificationEachFillial(result) : {};
          break;
        }
        case 'filliesAlarm': {
          result = await getJsonDataLastForAlarms();
          getCountResult = result ? getCountWorkClassificationEachFillialForAlarm(result) : {};
          break;
        }
        case 'routes': {
          getCountResult = result ? getCountWorkClassificationEachRoute(result) : {};
          break;
        }
        default: {
          getCountResult = result ? getCountWorkClassification(result) : {};
          break;
        }
      }

      res.status(200).json(getCountResult);
    } else {
      res.status(404).json('Only POST enabled...');
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});
