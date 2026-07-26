const { request, response } = require("express");

const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken, validateToken } = require('../helpers/tokenHelper');

exports.login = (req, res) => {

    const { Username, Password } = req.body;

    authService.authenticate(Username, Password,
        (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (data.length > 0) {

                //First time on successful authentication  generate new AccessToken 
                //and refreshToken
                const user = data[0];

                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                res.json({
                    token: accessToken,
                    refreshToken: refreshToken,
                    role: user.Role
                });
            } else {

                res.status(401).json({
                    message: "Invalid username or password"
                });
            }
        }
    );
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token required"
        });
    }

    validateToken(refreshToken)
        .then((decoded) => {
            if (decoded.type !== 'refresh') {
                return res.status(403).json({
                    message: "Invalid refresh token"
                });
            }

            const user = {
                UserId: decoded.UserId,
                Username: decoded.Username,
                Role: decoded.Role
            };

            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            res.json({
                token: accessToken,
                refreshToken: newRefreshToken,
                role: user.Role
            });
        })
        .catch(() => {
            res.status(403).json({
                message: "Invalid refresh token"
            });
        });
};