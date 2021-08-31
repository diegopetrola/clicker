import { connectToDatabase } from "./mongodb";

export const updateCounter = async (value, setValue) => {
    const result = await fetch("/api/counter", {
        method: "POST",
        body: JSON.stringify({ value }),
    });
    const data = await result.json();

    setNewTodoTitle("");
    setAllTodos((state) => [...state, data.todo]);
};

/**
 * Returns the top users by clicks
 * @param {Number} limit 
 * @returns {Array[Object]}
 */
export const getLeaderboard = async (limit = 20) => {
    const { db } = await connectToDatabase();
    const lb = await db.collection('counter')
        .find({})
        .sort({ count: -1 })
        .limit(limit)
        .toArray();
    lb.map((user) => {
        user._id = user._id.toString()
    });
    return lb;
}
/**
 * 
 * @param {String} user 
 * @returns {Object}
 */
export const getCounter = async (user) => {
    const { db } = await connectToDatabase();
    let counter = await db.collection('counter').findOne({ user: user });
    counter = counter != null ? counter : { user: user, count: 0 };
    return counter;
};
