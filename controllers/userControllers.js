const User = require('../models/userModel');

//Registering user into database
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (err) {
    console.error('Failed to create user', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

//Get User From a Particular id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Failed to get user details', err);
    res.status(500).json({ error: 'Failed to get user details' });
  }
};

//Updating User
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.company_name = req.body.company_name || user.company_name;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.zip = req.body.zip || user.zip;
    user.email = req.body.email || user.email;
    user.web = req.body.web || user.web;
    user.age = req.body.age || user.age;

    await user.save();
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Failed to update user details', err);
    res.status(500).json({ error: 'Failed to update user details' });
  }
};

//Deleting User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Failed to delete user', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
module.exports = { createUser, getUser, updateUser, deleteUser };
