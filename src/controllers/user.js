import { updateUserService } from '../services/user.js';

export const getUserCurrentController = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 200,
    message: 'Successfully found user!',
    data: user,
  });
};

export const updateUserController = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;

  const updatedUser = await updateUserService(userId, data);

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user!',
    data: updatedUser,
  });
};
