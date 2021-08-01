import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect("mongodb://localhost/dummy");
        const db = client.db();

        const meetupCollections = db.collection("meetups");
        const result = await meetupCollections.insertOne(data);
        // console.log(result);

        client.close();
        res.status(201).json({ message: "meetups inserted" });
    }
};
export default handler;
