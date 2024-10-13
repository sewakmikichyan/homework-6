import "./App.css";

const App = () => {
    const handleGet = (name, lastname, age) => {
        fetch("/users").then(res => res.json()).then(users => {
            const user = users.find(user => {
                return user.name === name && user.lastname === lastname && user.age === age;
            });
            alert(JSON.stringify(user, null, 4));
        });
    };


    const handleSubmit = (e) => {
        const newUser = {
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            age: e.target.age.value
        };

        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
    };

    const handleDelete = (name, lastname, age) => {
        if (!name || !lastname || !age) {
            return alert("Please provide valid name, lastname, and age!");
        }

        const userToDelete = { name, lastname, age };

        fetch("/users", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToDelete)
        });
    };

    return (
        <div className="App">
            <form className="form" action="/" onSubmit={handleSubmit}>
                <h2>Add a new user</h2>
                <input type="text" placeholder="Name" name="name" />
                <input type="text" placeholder="Lastname" name="lastname" />
                <input type="number" placeholder="Age" name="age" />
                <input type="submit" value="Send" />
            </form>

            <div className="buttons-group">
                <button onClick={() =>
                    handleDelete(
                        prompt("Enter user name"),
                        prompt("Enter user lastname"),
                        prompt("Enter user age")
                    )
                }>
                    Delete User
                </button>
                <button onClick={() => {
                    handleGet(
                        prompt("Enter user name"),
                        prompt("Enter user lastname"),
                        prompt("Enter user age")
                    );
                }}>Get User</button>
            </div>
        </div>
    );
};

export default App;