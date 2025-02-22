import { Request, Response } from 'express';
import { Student } from '../models/index';
import { User } from '../models/index';
import { createError } from '../error';

// student profile
export const studentProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { userId } = req.body;
    const { firstName, lastName, email, phoneNumber, gender, profilePicture, role, level } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        return next(createError('User not found!', 400));
    }

    await user.update({ firstName, lastName, email, phoneNumber, gender, profilePicture, role, level });

    if (role == 'student') {
        const level = "beginner";  
        await Student.create({ userId: user.id, level });
    }
    res.status(200).json({ message: 'Your Profile has been set successfully' });
  } catch (error) {
    next(error);
  }
};


// edit student profile
export const setProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phoneNumber, gender, profilePicture, level } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ firstName, lastName, phoneNumber, gender, profilePicture });

    if (user.role === 'student' && level) {
      const student = await Student.findOne({ where: { userId: user.id } });
      if (student) {
        await student.update({ level });
      } else {
        await Student.create({ userId: user.id, level });
      }
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};