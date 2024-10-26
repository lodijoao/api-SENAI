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

server.post('/login', async (request) => {
    const user = request.body;
    const exist = await sql`select * from users WHERE name = ${user.name} and password = ${user.password};`;
    if (exist[0]) {
        return true
    } else {
        return false;
    }
})

server.listen({
    port: 3333
})