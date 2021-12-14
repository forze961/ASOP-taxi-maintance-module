export default async function isUserHasRights(user) {
  let result = {
    status: false,
    access: '',
    user: {},
  };

  try {
    if (user) {
      const { login } = user || false;

      if (login) {
        if (login.is_active === true) {
          result = {
            status: true,
            user: login,
            access: '',
          };
        } else {
          result = {
            status: false,
            user: {},
            access: false,
          };
        }
      }
    }
  } catch (e) {

  }

  return result;
}
