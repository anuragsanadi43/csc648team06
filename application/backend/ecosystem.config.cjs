module.exports = {
    apps: [
      {
        name: "team06-api",
        script: "server.js",
        cwd: "/home/ubuntu/app/csc648-fa25-03-team06/application/team06-api",
        env: {
          NODE_ENV: "production",
          PORT: "3000",
          DB_HOST: "127.0.0.1",
          DB_PORT: "3306",
          DB_USER: "team06",
          DB_PASSWORD: "supersecret",
          DB_NAME: "team06db",
          JWT_SECRET: "change_me_now"
        },
        instances: 1,
        exec_mode: "fork",
        watch: false,
        out_file: "/var/log/pm2/team06-out.log",
        error_file: "/var/log/pm2/team06-err.log"
      }
    ]
  };
  
