import { iUserPost } from "./userPost"

export interface iBrandComment {
	id: number
	userPost: iUserPost
	dateTime: string
	publicReaction: number
}
