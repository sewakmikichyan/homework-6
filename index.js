import express from "express";
const app = express();

app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { name, lastname, age } = req.body;

    if (!name || !lastname || !age) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const newUser = { name, lastname, age };
    users.push(newUser);

    res.status(201).json({ message: "User added successfully!", user: newUser });
});

app.delete('/users', (req, res) => {
    const { name, lastname, age } = req.body;

    if (!name || !lastname || !age) {
        return res.status(400).json({ message: "Please provide valid name, lastname, and age!" });
    }

    const userId = `${name}${lastname}_${age}`;
    const index = users.findIndex(user =>
        `${user.name}${user.lastname}_${user.age}` === userId
    );

    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json({ message: "User deleted successfully!" });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
