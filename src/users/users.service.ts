import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/User';
import { UserDocument } from './schema/user.schema';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async list(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async get(userId: string): Promise<UserDocument | HttpException> {
    const user = await this.userModel.findOne({ _id: userId }).exec();

    if (!user) {
      return new HttpException('User not found', 404);
    }

    return user;
  }

  async create(user: User): Promise<UserDocument | null> {
    const { username, password } = user;

    const hasedPassword = await hash(password, 10);

    const newUser = await this.userModel.create({
      username,
      password: hasedPassword,
    });

    if (!newUser) {
      return null;
    }

    return newUser;
  }

  async update(userId: string, user): Promise<UserDocument | HttpException> {
    const userFound = await this.get(userId);

    if (!user) {
      return new HttpException('User not found', 404);
    }

    return this.userModel
      .findByIdAndUpdate(userId, Object.assign(userFound, user), { new: true })
      .exec();
  }

  async delete(userId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async getByCredentials(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.FORBIDDEN);
    }

    const passwordFound = await compare(password, user.password);

    if (!passwordFound) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
