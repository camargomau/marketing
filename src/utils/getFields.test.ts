import { describe } from "mocha"
import { expect } from "chai"
import { getFields } from "./getFields"
import { GraphQLResolveInfo } from "graphql"

describe("the getFields function", () => {
	const mockInfo: GraphQLResolveInfo = {
		fieldNodes: [
			{
				name: {
					kind: "Name",
					value: "main field"
				},
				selectionSet: {
					kind: "SelectionSet",
					selections: [
						{
							name: {
								value: "field without subfields"
							}
						},
						{
							name: {
								value: "field with subfields"
							},
							selectionSet: {
								selections: [
									{
										name: {
											value: "subfield"
										}
									}
								]
							}
						},
						{
							name: {
								value: "second field without subfields"
							}
						}
					]
				}
			},
			{
				name: {
					kind: "Name",
					value: "another main field"
				},
				selectionSet: {
					kind: "SelectionSet",
					selections: [
						{
							name: {
								value: "another field without subfields"
							}
						}
					]
				}
			}
		]
	} as any

	it("should exist", () => {
		expect(getFields).to.exist
	})
	it("should accept a GraphQLResolveInfo object", () => {
		const mockInfo: GraphQLResolveInfo = { fieldNodes: [] } as any
		expect(getFields(mockInfo, "main field")).to.deep.equal({
			attributes: [],
			include: [],
			name: "main field"
		})
	})
	it("should extract the fields from the GraphQLResolveInfo object", () => {
		const result = getFields(mockInfo, "main field")
		expect(result).to.deep.equal({
			name: "main field",
			attributes: ["field without subfields", "second field without subfields"],
			include: [
				{
					attributes: ["subfield"],
					include: [],
					name: "field with subfields"
				}
			]
		})
	})
	it("should be able diferentiate from multiple fieldNodes", () => {
		const result = getFields(mockInfo, "another main field")
		expect(result).to.deep.equal({
			name: "another main field",
			attributes: ["another field without subfields"],
			include: []
		})
	})
})
