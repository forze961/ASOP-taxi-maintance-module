import { withIronSession } from 'next-iron-session';

export default withIronSession(
  async (req: any, res: any) => {
    if (req.method === 'POST') {
      const { userFil, userNum, userName, userMob, userPass, userCar } = req.body;

      if (userFil && userNum && userName && userMob && userPass) {
        const newDataObj = {
          userFil,
          userNum,
          userName,
          userMob,
          userPass,
          userCar: userCar || 0,
        };

        req.session.set('user', newDataObj);
        await req.session.save();
        return res.status(201).send('');
      } else {
        return res.status(403).send('');
      }
    } else {
      return res.status(403).send('');
    }
  },
  {
    cookieName: 'TaxiAuth',
    cookieOptions: {
      secure: false,
    },
    password: 'lbIaVoYuyUeY0ZXDTU3dHJ4DcIy3nHsj',
  },
);
