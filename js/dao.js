const { MongoClient } = require("mongodb");

class DAO{

    constructor(){
        this.uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPWD}@${process.env.MONGOCLUSTER}/${process.env.MONGODB}?retryWrites=true&w=majority`;
    }

    async alreadyContains(coords){

        let client = await MongoClient.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
        let db = client.db(process.env.MONGODB);
        var result = null;
        try{
            const query = {lat: coords.lat, lon:coords.lon};
            result = await db.collection(process.env.MONGOCOLLECTION).findOne(query);
        }
        finally{
            client.close();
        }

        return result !== null;
    }

    async insert(city, coords){
        if(await this.alreadyContains(coords)) return;

        let client = await MongoClient.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
        let db = client.db(process.env.MONGODB);

        try{
            const doc = {name: city, lat: coords.lat, lon:coords.lon};
            await db.collection(process.env.MONGOCOLLECTION).insertOne(doc);
            
        }
        finally{
            client.close();
        }

        return city;
    }

    async delete(city){
        let client = await MongoClient.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
        let db = client.db(process.env.MONGODB);
        try{
            const doc = {name: city};
            await db.collection(process.env.MONGOCOLLECTION).deleteOne(doc);
        }
        finally{
            client.close();
        }
    }

    async getAll(){
        let client = await MongoClient.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
        let db = client.db(process.env.MONGODB);
        let result = [];
        try{
            const cursor = db.collection(process.env.MONGOCOLLECTION).find();
            await cursor.forEach(doc => {
                result.push(doc.name);
            });
        }
        finally{
            client.close();
        }

        return result;
    }
}

module.exports = DAO;