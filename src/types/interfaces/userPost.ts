import { iUserBrand } from "./userBrand";
import { iSocialNetwork } from "./socialNetwork";

export interface iUserPost {
	id: number
	userBrand: iUserBrand
	socialNetwork: iSocialNetwork
	dateTime: string
	sentiment: number
}
