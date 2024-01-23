import { Request, Response } from 'express';
import { UserModel } from '../db/user';
class UserController {
  public async getAllUsers(request: Request, response: Response) {
    try {
      const users = await UserModel.find();
      return response.status(200).json({ data: users });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }
}

export default new UserController();
