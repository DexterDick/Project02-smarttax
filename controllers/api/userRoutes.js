const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (request, response) => {
    try {
        const userData = await User.create(request.body);

        request.session.save(() => {
            request.session.user_id = userData.id;
            request.session.logged_in = true;

            response.status(200).json(userData);
        });
    } catch (error) {
        response.status(400).json(error);
    }
});

router.post('/login', async (request, response) => {
    try {
        const userData = await User.findOne({ where: { email: request.body.email } });

        if (!userData) {
            response
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
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

router.post('/logout', (request, response) => {
    if (request.session.logged_in) {
        request.session.destroy(() => {
            response.status(204).end();
        });
    } else {
        response.status(404).end();
    }
});

module.exports = router;
