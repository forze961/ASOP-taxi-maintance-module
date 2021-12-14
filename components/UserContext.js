// @flow strict
/*= ======================================
Component for use custom context for save and manipulate with  user login state
======================================== */
// eslint-disable-next-line import/no-unresolved
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

type Props = {|
  children: React$Node,
|};

export const UserContextProvider = ({ children }: Props): React$Node => {
  const [id, setId] = useState('');
  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

type UserContextFunc = void | {|id: string, setId: (((string) => string) | string) => void|}

export const user = (): UserContextFunc => useContext(UserContext);
