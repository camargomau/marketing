import { iBrandSocial } from "./brandSocial"
import { iWordTrend } from "./wordTrend"

export interface iLexical {
	id: number
	brandSocial: iBrandSocial
	wordTrend: iWordTrend
	frequency: number
}
