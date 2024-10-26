import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { sql } from './db.js'
import { randomUUID} from "crypto";

const server = fastify();

server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

server.get('/', () => {
    return sql`select * from users`
})

server.post('/users', async (request) => {
    const user = request.body;
    await sql`insert into users (id, name, password)
    values (${randomUUID()}, ${user.name}, ${user.password});`
    return '200'
})

server.listen({
    port: 3333
})