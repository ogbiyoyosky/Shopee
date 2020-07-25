const childProcess = require("child_process");
async function deploy(res) {
  return await childProcess.exec("bash ./deploy.sh", (err, stdout, stderr) => {
    console.log("deploy err", err);
    if (err) {
      console.log("deploy err", err);
    }
    console.log(`stdout: ${stdout}`);
  });
}
module.exports = { deploy };
