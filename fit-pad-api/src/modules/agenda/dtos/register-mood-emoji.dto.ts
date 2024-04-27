import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class RegisterMoodEmojiDto {
  @IsNotEmpty()
  @IsString()
  moodEmoji: string;
}
