import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

type Context = {
  Bindings: {
    DB: D1Database;
  };
  Variables: {
    // user: User;
  };
};

const app = new Hono<Context>().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello, Cloudflare Pages!',
  })
})

app.get("/users", async (c) => {
  let user: User = await c.env.DB.prepare(
    "SELECT * FROM users"
  ).first();
  return c.json(user);
});

interface User {
  id: number;
  username: string;
}

export const onRequest = handle(app)