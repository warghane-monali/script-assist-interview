const User = require('../Modals/AuthModal');
const bcrypt = require("bcryptjs");

class clsUser {

    // Create a new user
    async registerUser(req, res) {
        try {
            const { userName, password, firstName, lastName, mobileNo, emailId, age, address, designation } = req.body;

            if (!userName || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const existingUser = await User.findOne({ userName });
            if (existingUser) {
                return res.status(409).json({ message: 'Username already exists' });
            }
            else {
                let pass = await bcrypt.hash(password, 12);
                const user = new User({ userName, password: pass, firstName, lastName, mobileNo, emailId, age, address, designation });
                let userRes = await user.save();
                return res.status(200).json({ message: 'User registered successfully', userRes });

            }

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

    }

    // Get all users
    async getAllUsers(req, res) {

        try {

            let {
                searchTitle,
                documentsPerPage,
                page,
            } = req.body;

            let query = {};

            if (searchTitle) {

                let resStr = String(searchTitle).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                resStr = resStr.replace(/\s+/g, "\\s*");

                query.$or = [
                    { userName: { $regex: new RegExp(resStr, 'gi') } },
                    { mobileNo: { $regex: new RegExp(resStr, 'gi') } },
                ]

            }

            const docPerPage = parseInt(documentsPerPage) || 10;
            let pageNo = parseInt(page) || 1;
            const skipDocs = (pageNo - 1) * docPerPage;

            const users = await User.find(query).sort({ createdAt: -1 }).skip(skipDocs).limit(docPerPage);
            const usersCount = await User.countDocuments(query)

            if (users.length) {

                let responses = {
                    data: users,
                    count: usersCount,
                    noOfPages: Math.ceil(usersCount / docPerPage)
                }

                return res.status(200).json(responses);

            }
            else {

                return res.status(200).json({ message: "No data found" });

            }

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

    }

    async getUserByID(req, res) {
        try {
            const { _id } = req.body;

            if (!_id) {
                return res.status(400).json({ message: "User ID (_id) is required" });
            }

            const user = await User.findById(_id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ data: user });

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

}

module.exports = new clsUser();