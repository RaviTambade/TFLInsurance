
var userRepo=require("../reposetory/userReposetory");

exports.getAllUsers=(result)=>{
    // console.log("hello2");
    userRepo.getAllUsers(result);
    // console.log("hello2");
}


exports.getUserCount = (result) => {

    userRepo.getUserCount(result);

};

exports.resetPassword = (id, newPassword, callback) => {

    userRepo.resetPassword(id, newPassword, (err, result) => {

        if (err) {
            return callback(err);
        }

        callback(null, result);

    });

};



// Delete
exports.deleteUser = (id, result) => {
    userRepo.deleteUser(id, result);
};