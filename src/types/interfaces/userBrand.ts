import { iBrand } from "./brand";
import { iUser } from "./user";

export interface iUserBrand {
	id: number
	user: iUser
	brand: iBrand
	sentiment: number
}
