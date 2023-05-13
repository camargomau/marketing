import { iBrand } from "./brand";
import { iSocialNetwork } from "./socialNetwork";

export interface iBrandSocial {
	id: number;
	/**
	 * The brand to which thi saccount belongs (relation)
	 */
	brand: iBrand;
	/**
	 * The social network for this account (relation)
	 */
	socialNetwork: iSocialNetwork;
	/**
	 * The account's username
	 * @example "microsoft"
	 */
	username: string;
	/**
	 * The account's creation date
	 * @example "2012-08-28"
	 */
	creationDate: string;
}
