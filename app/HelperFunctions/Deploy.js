const childProcess = require('child_process');
async function deploy(res){

    return await childProcess.exec('bash ./deploy.sh', (err, stdout, stderr)=>{
        console.log(err)
        if (err) {
          console.log(err)
        }
        console.log(`stdout: ${stdout}`);
    
    });
}
module.exports = {deploy}