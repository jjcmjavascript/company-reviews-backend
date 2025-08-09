import 'dotenv/config';
import { exec } from 'child_process';

exec(
  `createdb -O ${process.env.DATABASE_USER} -E UTF8 ${process.env.DATABASE_NAME}`,
  (error, stdout, stderr) => {
    if (error) {
      console.info(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);
