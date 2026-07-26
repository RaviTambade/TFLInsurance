const { request, response } = require("express");
var userService = require("../services/userService");
const bcrypt = require("bcrypt");


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



exports.getUserCount = (req, res) => {

    userService.getUserCount((err, data) => {

         console.log(data);
        if (err) {
            return res.status(500).json(err);
        }

        res.json(data);

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