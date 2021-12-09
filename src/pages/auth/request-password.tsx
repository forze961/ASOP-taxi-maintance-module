import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';

import Layout from 'Layouts';
import Auth, { Group } from 'components/Auth';

export default function RequestPassword() {
  return (
    <Layout title="Забули пароль" titleNow="АСОП: taxi">
      <Auth title="Забули пароль" subTitle="Введіть свій номер телефону для відновлення паролю">
        <form>
          <InputGroup fullWidth>
            <input type="text" placeholder="Номер телефону" />
          </InputGroup>
          <Button
            style={{
              background: '#F17F14',
              borderRadius: '36.5px',
              borderColor: '#F17F14',
            }}
            status="Success"
            type="button"
            shape="SemiRound"
            fullWidth
          >
            Відновити пароль
          </Button>
        </form>
        <Group>
          <Link href="/auth/login">
            <a>Назад до авторизації</a>
          </Link>
          <Link href="/auth/register">
            <a>Реєстрація</a>
          </Link>
        </Group>
      </Auth>
    </Layout>
  );
}
