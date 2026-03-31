function UserCard({ user }) {
    return (
        <div className="card">
            <h2>{user.name}</h2>

            <p><span>💼 Job Title:</span> Software Engineer</p>
            <p><span>🏢 Department:</span> IT Department</p>
            <p><span>☎ Office:</span> {user.phone}</p>
            <p><span>📱 Mobile:</span> {user.phone}</p>
            <p><span>✉ Email:</span> {user.email}</p>
        </div>
    );
}

export default UserCard;