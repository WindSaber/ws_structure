const instalador = () => {
    const promise = new Promise((resolve, reject)=>{
        const exec = require('child_process').exec;
        exec('npm i @windsaber/ws_utils', (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                reject();
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject();
            }
            console.log(`stdout:\n${stdout}`);
            resolve();
        });
    });
    return promise;
}
module.exports = {instalador};
