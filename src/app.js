import express from 'express';

const app = express();

app.get('', (req, res) => res.send('Hello World! Je suis sur ' + process.env.ENVIRONMENT));

export default app;
