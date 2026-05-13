const nodemailer = require('nodemailer');
const https = require('https');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from }) {
    const data = JSON.stringify({
        sender: { email: from || process.env.EMAIL_FROM },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.brevo.com',
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': process.env.BREVO_API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body);
                } else {
                    reject(new Error(`Brevo API error: ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}