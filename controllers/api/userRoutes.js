const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require("../../utils/auth");

// Create a user
router.post('/', async (request, response) => {
    try {
        const userData = await User.create({...request.body});

        request.session.save(() => {
            request.session.user_id = userData.id;
            request.session.logged_in = true;

            response.status(200).json(userData);
        });
    } catch (error) {
        response.status(400).json(error);
    }
});

// User Login
router.post('/login', async (request, response) => {
    try {
        const userData = await User.findOne({ where: { email: request.body.email } });

        if (!userData) {
            response
                .status(400)
                .json({ message: 'Incorrect email, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(request.body.password);

        if (!validPassword) {
            response
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        request.session.save(() => {
            request.session.user_id = userData.id;
            request.session.logged_in = true;

            response.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (error) {
        response.status(400).json(error);
    }
});

// User Logout
router.post('/logout', (request, response) => {
    if (request.session.logged_in) {
        request.session.destroy(() => {
            response.status(204).end();
        });
    } else {
        response.status(404).end();
    }
});

// Update user acount info based on id
router.put('/:id', withAuth, async (request, response) => {
    try {
        const userId = request.params.id;
        const {name, password} = request.body;

        const userData = await User.update({
            name: name,
            password: password
        }, { where: {id: userId} });
        
        response.json({ user: userData, message:'User updated successfully!' });

    }catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;