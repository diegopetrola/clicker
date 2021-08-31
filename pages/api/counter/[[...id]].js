import { connectToDatabase } from "../../../lib/mongodb";
import { getCounter } from "../../../lib/crud";

import { ObjectId } from "bson";

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    const { db } = await connectToDatabase();
    const collection = db.collection("counter");
    let result, counter;

    switch (method) {
        case "POST":
            let { user, value } = JSON.parse(req.body);
            const result = await collection.updateOne(
                { user: user },
                { $inc: { count: 1 } },
                { upsert: true }
            );
            const new_count = await collection.findOne({ user: user })
            res.json(new_count);
            break;
        case "GET":
            const usr = req.query.id[0];
            res.json(await getCounter(usr));
            break;
        case "DELETE":
            const doc = { _id: ObjectId(id[0]) };
            result = await collection.deleteOne(doc);
            res.json({ deleted: result.deletedCount });
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};