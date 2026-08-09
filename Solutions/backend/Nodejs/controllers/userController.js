const { request, response } = require("express");
var userService = require("../services/userService");


exports.getAllUsers=(request,response)=>{
    userService.getAllUsers((err,result)=>{
        if(err){
            // console.log("hello1")
            return response.status(500).json(err)
        }
        else{
            response.json(result);
            console.log("Users fetched .....");
            
        }
    })
}

exports.getUserById = (req, res) => {

    const id = req.params.id;

    userService.getUserById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result);

    });

};

exports.getUserCount = (req, res) => {

    userService.getUserCount((err, data) => {

         console.log(data);
        if (err) {
            return res.status(500).json(err);
        }

        res.json(data);

    });

};

exports.createUser = (req, res) => {

    const { Username, Password, Role ,IsActive} = req.body;
    userService.createUser( Username, Password, Role ,IsActive, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(result);
    });
};

exports.resetPassword = (req, res) => {

    const id = req.params.id;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "New Password and Confirm Password do not match."
        });
    }

    userService.resetPassword(id, newPassword, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Password reset successfully."
        });

    });

};


exports.deleteUser = (req, res) => {

    userService.deleteUser(

    req.params.id,

        (err, data) => {

            if (err)
                return res.status(500).send(err);

            res.json({
                message: "User Deleted Successfully"
           
           });

        if (data) {    
                    UserId: req.body.UserId,
                    data
                     };
                    
        }
                    
                    
    )}

    exports.getCustomerProfileByUserId = (req, res) => {

    const id = req.params.id;

    userService.getCustomerProfileByUserId(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Customer profile not found" });
        }

        res.json(result);

    });

};

    // Update Role
exports.updateRole = (req, res) => {

    const id = req.params.id;
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({
            success: false,
            message: "Role is required"
        });
    }

    userService.updateRole(id, role, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Role updated successfully"
        });

    });

};