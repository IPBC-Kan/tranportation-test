import { config } from 'dotenv';
import app from './app';
/* import Authorization from './middleware/authorization';
const isAuth = new Authorization(); */

config();

console.log('NODE_ENV = ' + process.env.NODE_ENV);
// init port
const PORT = process.env.PORT || 8085;

// app.listen(PORT, () =>
// 	console.log(`App is listening at http://localhost:${PORT}`)
// );

app.listen(PORT, () => {
    console.log('MongoDB URL = ' + process.env.DATABASE_URL), console.log(`App is listening at http://localhost:${PORT}`);
});

export default app;
