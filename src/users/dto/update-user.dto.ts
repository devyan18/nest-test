import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(4, 20)
  username?: string;

  @IsNotEmpty()
  @Length(6)
  password?: string;
}
