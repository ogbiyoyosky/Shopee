var childProcess = require('child_process');
function deploy(res){
    childProcess.exec('cd /home && ./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}
module.exports = {deploy}