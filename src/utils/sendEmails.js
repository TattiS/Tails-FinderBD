import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'), // напр. smtp.gmail.com
  port: Number(getEnvVar('SMTP_PORT')), // 465 або 587
  secure: Number(getEnvVar('SMTP_PORT')) === 465, // true для 465
  auth: {
    user: getEnvVar('SMTP_USER'), // поштовий акаунт
    pass: getEnvVar('SMTP_PASS'), // пароль або app password
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"TailsFinder" <${getEnvVar('SMTP_USER')}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
