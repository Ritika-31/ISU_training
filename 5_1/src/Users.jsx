import { use } from "react";
import UserCard from "./UserCard";

const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json());

function Users() {
    const users = use(fetchUsers);

    return (
        <div className="grid">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default Users;