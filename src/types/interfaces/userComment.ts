import { iBrandPost } from "./brandPost"
import { iUser } from "./user"

export interface iUserComment {
	id: number
	brandPost: iBrandPost
	user: iUser
	dateTime: string
	sentiment: number
}
