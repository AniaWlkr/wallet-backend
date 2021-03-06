const { UsersRepository } = require('../repository');

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async updateBalance(id, balance) {
    const data = await this.repositories.users.updateBalance(id, balance);
    return data;
  }

  async verify({ verificationToken }) {
    const user = await this.repositories.users.updateVerifyToken(
      verificationToken,
    );
    if (user) return true;
    return false;
  }
}

module.exports = new UserService();
