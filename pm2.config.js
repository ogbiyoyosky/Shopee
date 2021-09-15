var pm2Config = {
    apps: [
      {
        name: "server",
        script: "server.js",
        exec_mode: "cluster_mode",
        instances: 1,
        watch: false,
        ignore_watch: ["node_modules", ".git", "tmp", "./Dockerfile"],
      },
    ],
  };
  
  module.exports = pm2Config;