import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User, { IUser, IUserDocument } from '../models/User';
import ErrorResponse from '../utils/errorResponse';

// Generate JWT Token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  
  // Use type assertion to bypass the overly strict type definition
  return jwt.sign(
    { id },
    secret,
    {
      expiresIn,
      algorithm: 'HS256',
    } as jwt.SignOptions
  );
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user with proper typing
    const userData: Omit<IUser, 'comparePassword'> = {
      name,
      email,
      password,
      role,
    };
    
    const user = (await User.create(userData)) as IUserDocument;

    // Create token (convert _id to string)
    const token = generateToken(user._id.toString());

    // Create cookie
    res.cookie('token', token, {
      expires: new Date(
        Date.now() +
          ((process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE) : 30) *
            24 *
            60 *
            60 *
            1000)
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user with proper typing
    const user = (await User.findOne({ email }).select('+password').exec()) as IUserDocument | null;

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Create token (convert _id to string)
    const token = generateToken((user._id as any).toString());

    // ✅ Create cookie
    res.cookie('token', token, {
      expires: new Date(
        Date.now() +
          ((process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE) : 30) *
            24 *
            60 *
            60 *
            1000)
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as any)?._id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
