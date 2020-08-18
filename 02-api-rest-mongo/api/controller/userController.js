const User = require('../models/User');
const { use } = require('../routes/userRoutes');

const userController = {
    getAllUsers: (req, res) => {
        User.find(
            (err, users) => {
                return err ? res.status(500).send(err) : res.status(200).jsonp(users)
            }
        )
    },
    newUser: (req, res) => {
        const { body } = req;
        const user = new User();
        user.name = body.name;
        user.lastName = body.lastName;
        user.phone = body.phone;
        user.address = body.address;

        user.save(
            (err, newUser) => err ? res.status(500).send('error guardando' + err.message) : res.status(200).send(newUser)
        );
    },
    getUser: (req, res) => {

        User.findById(req.params.id, (err, user) =>
            err ? res.status(500).send('error', err.message) : res.status(200).jsonp(user)
        )
    },
    updateUser: (req, res) => {
        const { body, params } = req;
        User.findById(params.id, (err, user) => {
            if (err) { return res.status(404).send('No encontrado'); }
            user.name = body.name;
            user.lastName = body.lastName;
            user.phone = body.phone;
            user.address = body.address;
            user.save();
            return res.status(200).jsonp(user)

        })
    },
    deleteUser: (req, res) => {
        const { id } = req.params;
        User.findById(id, (err, user) => {
            if (err) return res.status(500).send('error interno');
            if (!user) return res.status(404).send('no encontrado');
            user.remove();
            return res.status(200).jsonp(user)
        })
    }


}

module.exports = userController;