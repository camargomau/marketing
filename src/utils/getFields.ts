import { GraphQLResolveInfo } from "graphql"

export interface iFieldSelection {
	attributes: string[]
	include: iFieldSelection[]
	name: string
}

export const getFields = (
	info: GraphQLResolveInfo,
	mainFieldName: string
): iFieldSelection => {
	const fieldNode = info.fieldNodes.find(
		(fieldNode: any) => fieldNode.name.value === mainFieldName
	)
	const fields: iFieldSelection = {
		attributes: [],
		include: [],
		name: mainFieldName
	}
	if (fieldNode && fieldNode.selectionSet) {
		fieldNode.selectionSet.selections.forEach((selection: any) => {
			if (!selection.selectionSet) fields.attributes.push(selection.name.value)
			else
				fields.include.push(
					getFields({ fieldNodes: [selection] } as any, selection.name.value)
				)
		})
	}
	return fields
}
