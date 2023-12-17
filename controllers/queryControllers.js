
const User = require('../models/userModel');

const filterQueries = async (req, res) => {
  try {
    // Extract query parameters
    const { first_name, last_name, sort, page = 1, limit = 5 } = req.query;

    // Build query object for searching
    const queryObject = {};
    if (first_name) {
      queryObject.first_name = { $regex: first_name, $options: 'i' };
    }
    if (last_name) {
      queryObject.last_name = { $regex: last_name, $options: 'i' };
    }

    // Build sort object for sorting
    const sortObject = {};
    if (sort) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortBy = sort.replace(/^-/, '');
      sortObject[sortBy] = sortOrder;
    } else {
      // Default sorting by age in ascending order
      sortObject.age = 1;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute the query with pagination, searching, and sorting
    const users = await User.find(queryObject)
      .sort(sortObject)
      .skip(skip)
      .limit(parseInt(limit));

    // Return the results
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { filterQueries };
