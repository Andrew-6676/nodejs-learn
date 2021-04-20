const usersRepo = require('./user.db.repository');

const get = (id) => usersRepo.get(id);

const save = (user) => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async (id) => {
    await usersRepo.remove(id);
};

module.exports = { get, save, update, remove };
