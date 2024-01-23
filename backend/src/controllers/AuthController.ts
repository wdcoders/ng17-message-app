import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../_helpers/validators';
import bcrypt from 'bcrypt';
import { UserModel } from '../db/user';
import { generateToken } from '../middleware/authenticate';
import { IRequest, IUser } from '../models/common.model';

class AuthController {
  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      loginSchema.parse({ email, password });

      const user = await UserModel.findOne({
        email,
      });

      if (user) {
        const data: IUser = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: '',
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          const token = generateToken(data);
          user.token = token;
          await user.save();
          data.token = token;

          return response
            .status(201)
            .json({ message: 'User logged in successfully', data });
        }
      }

      return response
        .status(400)
        .json({ status: false, message: 'Invalid credentials' });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async register(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      registerSchema.parse({ name, email, password });

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new UserModel({
        name,
        email,
        password: hashPassword,
      });

      await user.save();

      return response
        .status(201)
        .json({ message: 'User created successfully' });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async me(request: IRequest, response: Response) {
    try {
      const email = request.user?.email;
      const user = await UserModel.findOne({
        email,
      });
      if (user) {
        const data: IUser = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: user.token || '',
        };
        return response.status(201).json({ data });
      }
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async logout(request: IRequest, response: Response) {
    try {
      const email = request.user?.email;
      const user = await UserModel.findOne({
        email,
      });

      if (user) {
        user.token = null;
        await user.save();
      }

      return response
        .status(200)
        .json({ message: 'User logged out successfully' });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }
}

export default new AuthController();
