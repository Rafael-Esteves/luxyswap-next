import { exec } from "child_process";
import { CronJob } from "cron";

// Run every hour
new CronJob(
  "0 * * * *",
  () => {
    console.log("Running icon fetch...");
    exec("tsx scripts/fetchCoinIcons.ts", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  },
  null,
  true,
  "UTC"
);
