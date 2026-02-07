const  express = require('express')

const app = express()
const port = 3000;
const AuthRot = require('./Routers/AuthRot.js');

const ConnectDb = require('./Config/DataBaseConnection.js');

app.use(express.json());
app.use("/app/Auth",AuthRot);


const startServer = async () =>{
    try {
        await ConnectDb();

        app.listen(port,()=>{
            console.log(`App is running on ${port}`);
        })
    }

    catch(error){
        console.log("failed in connecting the DB or Strat in Server",error)
        process.exit(1);
    }
}

startServer();

