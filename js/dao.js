class DAO{

    constructor(){
        const MongoClient = require('mongodb').MongoClient;
        const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPWD}@${process.env.MONGOCLUSTER}/${process.env.MONGODB}?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    alreadyContains(coords){
        let result;
        this.client.connect(async (err) => {
            const collection = client.db(process.env.MONGODB).collection(process.env.MONGOCOLLECTIONS);

            const query = {lat: coords.lat, lon: coords.lon};
            result = await collection.findOne(query);
            this.client.close();
        });

        return result === null;
    }

    insert(city, coords){
        if(this.alreadyContains) return;
        this.client.connect(async (err) => {
            const collection = client.db("favoriteCities").collection("cities");

            const cityObj = {name: city, lat: coords.lat, lon:coords.lon};
            await collection.insertOne(cityObj);
            this.client.close();
        });
    }

    delete(city){
        this.client.connect(async (err) => {
            const collection = client.db("favoriteCities").collection("cities");

            await collection.deleteOne({name: city});
            this.client.close();
        });
    }

    getAll(){
        let result = [];
        this.client.connect(async (err) => {
            const collection = client.db(process.env.MONGODB).collection(process.env.MONGOCOLLECTIONS);

            const cursor = collection.find();
            await cursor.forEach(doc => {
                result.push(doc.name);
            });
            this.client.close();
        });
        return result;
    }
}

module.exports = DAO;