const authRepo = require('../reposetory/authRepository');

exports.authenticate = (Username, Password, result) => {

    authRepo.authenticate(
        Username,
        Password,
        result
    );
};