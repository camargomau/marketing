import { iUser } from "./user";
import { iSocialNetwork } from "./socialNetwork";

export interface iUserSocial {
	id: number
	user: iUser
	socialNetwork: iSocialNetwork
	username: string
	creationDate: string
}
