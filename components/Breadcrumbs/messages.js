// @flow Strict

import { defineMessages } from 'react-intl';

const messages: {|homeLink: {|defaultMessage: string, description: string, id: string|}|} = defineMessages({
  homeLink: {
    id: 'Breadcrumbs.homeLink',
    defaultMessage: 'Home',
    description: 'Breadcrumbs home link title',
  },
});

export default messages;
