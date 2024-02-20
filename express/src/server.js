const express = require('express');
const app = express();
const PORT = 3000;

let users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
];

app.use(express.json());
app.put('/users/:id', (req, res) => {
    // Correctly parse the user's id from the request parameters
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    // Handle the case where the user is not found
    if (userIndex === -1) return res.status(404).send('User not found');

    // TODO: Validate req.body before updating
    // Check if req.body has the necessary properties
    if (!req.body.name || !req.body.age) {
        return res.status(400).send('Bad request: missing name or age');
    }

    // Update the user's properties if the user exists
    users[userIndex].name = req.body.name;
    users[userIndex].age = req.body.age;

    res.json(users[userIndex]);
});

// Error handling middleware to catch any unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});