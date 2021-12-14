import filiesData from '../../lib/mockFilies';

export default function handler(req, res) {
  try {
    const results = filiesData.map((obj) => {
      if (obj.asdu_id !== '0') {
        return { id: Number(obj.asdu_id), name: obj.name, nameAbr: obj.prefix };
      }
    }).sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))).filter((x) => x != null);

    res.status(200).json(results);
  } catch (e) {
    res.status(500).json([]);
  }
}
