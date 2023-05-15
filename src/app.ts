import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth";
import config from "./config/config";
import logger from './middleware/logger';

const productsUrl = `https://api.bigcommerce.com/stores/${config.store_hash}/v3/catalog/products`;
const buyUrl = `https://api.bigcommerce.com/stores/${config.store_hash}/v3/carts`;

const app: Express = express();
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json('{response: "ok", code: 200}');
});

app.post("/login", (req, res) => {
  try {
    if (!(req.body && req.body.email && req.body.password))
      return res.status(400).send("Email, Password required");

    const { email, password } = req.body;
    const user = config.userList.active.find((u) => u.email === email);

    if (!(emailRegExp.test(email) && passwRegExp.test(password) && user))
      return res.status(400).send("Invalid credentials");

    if (user && user.password === password) {
      const token = jwt.sign({ user_id: user.id, email }, config.key_token, {
        expiresIn: "2h",
      });
      return res.status(200).json({ id: user.id, email, token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    return logger.info(err);
  }
});

app.get("/welcome", auth, (req, res) => {
  logger.log(req.body);
  res.status(200).json({ response: "Welcome secure 🙌 ", code: 200 });
});

app.get("/products", auth, (_, res) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": config.access_token,
    },
  };

  fetch(productsUrl, options)
    .then((res) => res.json())
    .then((json) => res.status(200).json({ response: json }))
    .catch((err) => logger.error("error:" + err));
});

app.post('/buy', auth, (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': config.access_token,
    },
    body: JSON.stringify({
      line_items: req.body.items,
      customer_id: 0,
      channel_id: 1,
      currency: {code:'UAH'},
      locale: 'en-US',
    }),
  };
  logger.info('/buy')
  // @ts-ignore
  fetch(buyUrl, options)
    .then((res) => res.json())
    .then((json) => res.status(200).json({ response: json }))
    .catch((err) => logger.error('error:' + err));
});
export default app;
