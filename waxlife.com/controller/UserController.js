const UserService = require('../serviceImpl/UserServiceImpl');
const userRequestDto = require('../dto/request/userRequestDto');
const validateRequest = require('../exception/GlobalException');

class UserController {
  async createUser(req, res) {
    const { error, value } = userRequestDto.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const user = await UserService.createUser(value);
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateUser(req, res) {
    const { error, value } = userRequestDto.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const updatedRows = await UserService.updateUser(req.params.id, value);
      if (!updatedRows) return res.status(404).send('User not found');
      res.status(200).send('User updated successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const rowsDeleted = await UserService.deleteUser(req.params.id);
      if (!rowsDeleted) return res.status(404).send('User not found');
      res.status(200).send('User deleted successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new UserController();
