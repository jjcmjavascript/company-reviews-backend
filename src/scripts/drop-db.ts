import { exec } from 'child_process';
import 'dotenv/config';

exec(`dropdb ${process.env.DATABASE_NAME}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
