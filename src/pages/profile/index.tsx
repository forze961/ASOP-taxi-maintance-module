import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Select from '@paljs/ui/Select';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ToastContainer from '../../components/Toasts';
import Auth from 'components/Auth';
import Layout from 'Layouts';
import withSession from 'lib/session';
import Spinner from '@paljs/ui/Spinner';

const statusOption: { value: any; label: any }[] = [
  { label: 'Перевізник #1', value: '1' },
  { label: 'Перевізник #2', value: '2' },
  { label: 'Перевізник #3', value: '3' },
];

interface UserProps {
  user: {
    userFil: string;
    userNum: number;
    userName: string;
    userMob: string;
    userPass: string;
    userCar?: number;
  };
}

const getCurrFilial = (value: string) => {
  return statusOption.find((x) => x.value === value);
};

const Profile: React.FC<UserProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; target: any }) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;

    const formData = new window.FormData(form);
    const userFil = formData.get('userFil');
    const userNum = formData.get('userNum');
    const userName = formData.get('userName');
    const userMob = formData.get('userMob');
    const userCar = formData.get('userCar');
    const userPass = formData.get('userPass');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userFil, userNum, userName, userMob, userPass, userCar }),
    });

    if (response.ok) {
      toast.success('Профіль оновлено!');
    }
    setLoading(false);
  };

  return (
    <Layout title="Профіль" titleNow="Профіль" username={user.userName}>
      <ToastContainer />

      <Auth title="Профіль" subTitle="Ви можете оновити інформацію та закріпити за собою РО">
        {loading && (
          <Spinner status="Warning" size={'Large'}>
            Зачекайте...
          </Spinner>
        )}

        <form onSubmit={handleSubmit}>
          <Select
            name="userFil"
            fullWidth
            shape="Round"
            options={statusOption}
            placeholder="Перевізник"
            size="Large"
            defaultValue={getCurrFilial(user.userFil || '')}
          />
          <InputGroup fullWidth shape="Round">
            <input name="userNum" type="number" placeholder="Таб. номер" defaultValue={user.userNum || ''} />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userName" type="text" placeholder="ПІБ" defaultValue={user.userName || ''} />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userMob" type="text" placeholder="Номер телефону" defaultValue={user.userMob || ''} />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userCar" type="number" placeholder="Закріплення РО" defaultValue={user.userCar || ''} />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userPass" type="password" placeholder="Новий пароль" />
          </InputGroup>
          <Button
            style={{
              background: '#F17F14',
              borderRadius: '36.5px',
              borderColor: '#F17F14',
            }}
            status="Success"
            type="submit"
            shape="SemiRound"
            fullWidth
          >
            Оновити дані
          </Button>
        </form>
      </Auth>
    </Layout>
  );
};

export const getServerSideProps = withSession(async ({ req, res }: any) => {
  const user = req.session.get('user');

  if (!user) {
    res.setHeader('location', '/auth/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user },
  };
});

export default Profile;
