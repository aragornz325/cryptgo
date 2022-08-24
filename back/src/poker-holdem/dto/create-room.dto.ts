import { IsString, IsNumber, IsArray } from "class-validator";
export class CreateRoomDto {
	@IsString()
	type: string;
	@IsNumber()
	entryPrice: number;
	@IsNumber()
	rakeValue: number;
	@IsNumber()
	maxPlayers: number;
	@IsNumber()
	timeout: number;
	
	availableSeats?: number[]
}