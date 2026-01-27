import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty() 
    task!: string;

    @IsNotEmpty()
    payload!: Record<string, any>;
}