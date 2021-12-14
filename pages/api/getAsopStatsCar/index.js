import { getSpecificCarByFilial } from '../../../lib/postgress';
import filiesData from '../../../lib/mockFilies';

// Functionality for filter by type car on filies. (Fix situation when in fillial car num identicaly with other fillial)
const filterByTypeCar = (type, filial) => {
  const busFilials = ['2', '5', '6', '8'];
  const trolFilials = ['9', '10', '11', '12'];
  const tramFilials = ['13', '14', '15'];

  switch (type) {
    case 'bus': {
      return busFilials.includes(filial);
    }
    case 'trol': {
      return trolFilials.includes(filial);
    }
    case 'tram': {
      return tramFilials.includes(filial);
    }
    default: {
      return false;
    }
  }
};

// Not auth, 'Cause this is public data and used in other services
export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const filterObj = req.body.filter;
      const { carType } = req.body;

      let result = await getSpecificCarByFilial(filterObj);

      let filName = '';

      if (result.length > 0) {
        result = result.filter((x) => filterByTypeCar(carType, x.elem));
      }

      if (result.length > 0) {
        filName = filiesData.find((cur) => cur.asdu_id === result[0].elem);
      }

      res.status(200).json({ filName: filName.name, data: result });
    } else {
      res.status(404).json('Only POST enabled...');
    }
  } catch (e) {
    res.status(500);
  }
}
