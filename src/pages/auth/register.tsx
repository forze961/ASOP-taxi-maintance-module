import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Select from '@paljs/ui/Select';
import React, { useState } from 'react';
import Link from 'next/link';
import Spinner from '@paljs/ui/Spinner';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import { useRouter } from 'next/router';

const statusOption: { value: any; label: any }[] = [
  { label: 'Перевізник #1', value: '1' },
  { label: 'Перевізник #2', value: '2' },
  { label: 'Перевізник #3', value: '3' },
];

export default function Register() {
  const router = useRouter();
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
    const userPass = formData.get('userPass');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userFil, userNum, userName, userMob, userPass }),
    });

    form.reset();

    if (response.ok) {
      if (typeof window !== 'undefined') {
        router.push('/route');
      } else {
        router.push('/route');
      }
    }
    setLoading(false);
  };

  return (
    <Layout title="Зареєструватися!" titleNow="Зареєструватися">
      <Auth title="Зареєструватися!" subTitle="Введіть свій номер телефону та пароль">
        {loading && (
          <Spinner status="Warning" size={'Large'}>
            Зачекайте...
          </Spinner>
        )}

        <form onSubmit={handleSubmit}>
          <Select name="userFil" fullWidth shape="Round" options={statusOption} placeholder="Перевізник" size="Large" />
          <InputGroup fullWidth shape="Round">
            <input name="userNum" type="text" placeholder="Таб. номер" />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userName" type="text" placeholder="ПІБ" />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userMob" type="text" placeholder="Номер телефону" />
          </InputGroup>
          <InputGroup fullWidth shape="Round">
            <input name="userPass" type="password" placeholder="Пароль" />
          </InputGroup>
          <Group>
            <Link href="/auth/login">
              <a>Вже зареєстровані?</a>
            </Link>
          </Group>
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
            Зареєструватися
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
