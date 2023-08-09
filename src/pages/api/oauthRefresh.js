const fetch = require('node-fetch');
const config = require('../../utils/config');

const refreshAccessToken = async (user) => {
    const body = `grant_type=refresh_token&refresh_token=${user.refreshToken}&client_id=${config.oauthClientId}&client_secret=${config.oauthClientSecret}`;

    try {
        const response = await fetch(`${config.oauthUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (response.ok) {
            const tokenJson = await response.json();
            return tokenJson;
        } else {
            throw new Error("Could not refresh access token, please sign in again.");
        }
    } catch (error) {
        throw new Error("Error refreshing access token: " + error.message);
    }
};

module.exports = { refreshAccessToken };
