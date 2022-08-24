
import { User } from 'src/users/interfaces/user.interface';

export class Player{ 
	id: string;
	userId: string;
	nickname?: string;
	bet?: number;
	hand?: any[];
	called: boolean;
	folded?: boolean;
	checked?: boolean;
	connected:boolean;
	solvedHand: any;
	turn: boolean;
	bigBlind: boolean;


	constructor(id: string, userId: string, bigBlind?: boolean) {
	this.bigBlind = bigBlind;
	this.id = id;
	this.userId = userId;
	this.turn = false;
	this.folded = false;
	this.called = false;
	this.checked = false;
	this.connected = true;
	}
}