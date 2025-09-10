export const extractNotifications = (req, res, next) => {
  if (req.body.notificationsAllowed !== undefined) {
    req.notificationsAllowed = req.body.notificationsAllowed;
    delete req.body.notificationsAllowed;
  }
  next();
};
