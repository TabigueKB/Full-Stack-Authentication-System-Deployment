const Brevo = require('@getbrevo/brevo');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from }) {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = { email: from || process.env.EMAIL_FROM };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
}