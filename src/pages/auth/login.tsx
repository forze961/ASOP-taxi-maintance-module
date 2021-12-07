import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';

export default function Login() {
  return (
    <Layout title="Вітаємо!">
      <Auth title="Вітаємо!" subTitle="Введіть свій логін та пароль">
        <form>
          <InputGroup fullWidth>
            <input type="text" placeholder="Логін" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Пароль" />
          </InputGroup>
          <Group>
            <Link href="/auth/request-password">
              <a>Забули пароль?</a>
            </Link>
          </Group>
          <Button style={{
            background: '#F17F14',
            borderRadius: '36.5px',
            borderColor: '#F17F14'
          }}
                  status="Success"
                  type="button"
                  shape="SemiRound"
                  fullWidth >
            Увійти
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
