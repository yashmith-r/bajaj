const User = require('../models/User');

const getOperationCode = (req, res) => {
    res.status(200).json({ operation_code: 1 });
};

const postData = async (req, res) => {
    const { data, user_id } = req.body;

    if (!data || !Array.isArray(data) || !user_id) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input'
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0];

    try {
        let user = await User.findOne({ user_id });

        if (user) {

            user.numbers = numbers;
            user.alphabets = alphabets;
            user.highest_alphabet = highestAlphabet ? [highestAlphabet] : [];
            await user.save();
        } else {
            user = new User({
                user_id,
                numbers,
                alphabets,
                highest_alphabet: highestAlphabet ? [highestAlphabet] : []
            });
            await user.save();
        }

        res.json({
            is_success: true,
            user_id,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: 'Database error'
        });
    }
};

module.exports = {
    getOperationCode,
    postData
};