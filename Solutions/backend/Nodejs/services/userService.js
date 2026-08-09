
var userRepo=require("../reposetory/userReposetory");

exports.getAllUsers=(result)=>{
    // console.log("hello2");
    userRepo.getAllUsers(result);
    // console.log("hello2");
}

exports.getUserById = (id, callback) => {

    userRepo.getUserById(id, (err, data) => {

        if (err) {
            return callback(err);
        }

        callback(null, data);

    });

};

exports.getUserCount = (result) => {

    userRepo.getUserCount(result);

};

exports.createUser = (Username, Password, Role ,IsActive, result) => {

    userRepo.createUser(Username, Password, Role ,IsActive, result);
};

exports.resetPassword = (id, newPassword, callback) => {

    userRepo.resetPassword(id, newPassword, (err, result) => {

        if (err) {
            return callback(err);
        }

        callback(null, result);

    });

};

// Update Role
exports.updateRole = (id, role, result) => {

    const allowedRoles = ["Admin", "Customer", "Agent", "Employee"];

    if (!allowedRoles.includes(role)) {
        return result(new Error("Invalid Role"));
    }

    userRepo.updateRole(id, role, result);

};



// Delete
exports.deleteUser = (id, result) => {
    userRepo.deleteUser(id, result);
};

exports.getCustomerProfileByUserId = (id, callback) => {

    userRepo.getCustomerProfileByUserId(
        id,
        (err, result) =>  {
            
            if (err) {
            return callback(err);
        }

        callback(null, result);

    });

};