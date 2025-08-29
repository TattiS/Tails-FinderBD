import { sendEmail } from '../utils/sendEmails.js';

export const notifyUsersService = async (matches, advert) => {
  if (!matches?.length) return;

  const link = `${process.env.FRONTEND_URL}/adverts/${advert._id}`;

  for (const match of matches) {
    const { user } = match;

    if (!user || !user.notificationsAllowed) continue;

    const subject =
      advert.type === 'found'
        ? 'Можливо, знайдено вашу тварину 🐾'
        : 'Можливо, хтось шукає вашу знахідку 🐾';

    const text = `
Вітаю, ${user.name || 'користувач'}!

Ми знайшли оголошення, яке може відповідати вашому (${match.type}).

 Переглянути: ${link}`;

    try {
      await sendEmail(user.email, subject, text);
    } catch (error) {
      console.error(
        `Помилка надсилання email користувачу ${user.email}:`,
        error.message,
      );
    }
  }
};
