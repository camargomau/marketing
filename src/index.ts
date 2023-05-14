import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs"
import { mainDB } from "./providers/mainDB"
import { resolvers } from "./resolvers/index"
import { getLogger } from "./utils/logger"

const logger = getLogger()

//  Obtenemos el schema de nuestro archivo .graphql
const typeDefs = readFileSync("./schema.graphql").toString("utf-8")

//  Creamos una instancia de ApolloServer con el esquema de tipo y los resolvedores,
//  además de pasarle un tipo con el contenido del contexto
export interface iContext {
	db: mainDB
}

const server = new ApolloServer<iContext>({
	typeDefs,
	resolvers
})

//  Iniciamos el servidor y lo ponemos a escuchar en el puerto 4000
//  Nota: El servidor se inicia de forma asíncrona, por lo que debemos usar async/await
//  puesto que debido a configuraciones de NodeJS, no podemos usar promesas directamente
//  en el archivo principal.
const main = async () => {
	const db = new mainDB()
	await db.connect()
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		// Enviamos la instancia de la base de datos a los resolvers
		context: async ({ req, res }) => ({ db })
	})

	logger.info(`🚀  Server ready at: ${url}`)
}

main()
