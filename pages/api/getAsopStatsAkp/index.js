import { getSpecificAkp } from '../../../lib/postgress';

// Not auth, 'Cause this is public data and used in other services
export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const filterObj = req.body.filter;

      const result = await getSpecificAkp(filterObj);

      let filName = '';

      if (result.length > 0) {
        filName = result[0].elem.name;
      }

      res.status(200).json({ filName, data: result });
    } else {
      res.status(404).json('Only POST enabled...');
    }
  } catch (e) {
    res.status(500);
  }
}
