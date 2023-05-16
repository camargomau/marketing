import { iBrandComment } from "./brandComment"
import { iBrandPost } from "./brandPost"
import { iInteractionType } from "./interactionType"
import { iUserComment } from "./userComment"
import { iUserPost } from "./userPost"

export interface iInteraction {
	id: number
	amount: number
	interactionType: iInteractionType
	brandPost: iBrandPost
	brandComment: iBrandComment
	userPost: iUserPost
	userComment: iUserComment
}
