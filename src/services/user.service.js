class User {
  constructor({ username, password, information }) {
    this.username = username;
    this.password = password;
    this.information = information || {};
  }
}

let users = [
  new User({
    username: "",
    password: "",
    information: {
      id: 1,
      address: "",
      email: "",
      gender: "",
      birth: new Date(),
    },
  }),
];

exports.allUser = () => users;

exports.searchId = (search) => {
  const result = users.filter((item) => {
    return item.information.id.toLowerCase().includes(search.toLowerCase());
  });
  return result;
};

exports.findById = (id) => {
  const result = users.filter((user) => user.information.id == id);

  if (result.length > 0) {
    return result[0];
  }
  return null;
};

exports.addUser = (body) => {
  const {
    username,
    password,
    information: { gender, birth, address, email },
  } = body;
  const id = users.length + 1;
  const user = new User({
    username,
    password,
    information: { id, address, email, gender, birth },
  });
  users = [...users, user];
  return user;
};

exports.editUser = (id, body) => {
  const {
    username,
    password,
    information: { gender, birth, address, email },
  } = body;
  const findIndex = users.findIndex((user) => user.information.id == id);

  if (findIndex !== -1) {
    users[findIndex] = {
      ...users[findIndex],
      username,
      password,
      information: {
        ...users[findIndex].information,
        gender,
        birth,
        address,
        email,
      },
    };
    return users[findIndex];
  }
  return null;
};

exports.delete = (id) => {
  const findIndex = users.findIndex((user) => user.information.id == id);

  if (findIndex !== -1) {
    users.splice(findIndex, 1);
    return id;
  }
  return id;
};
