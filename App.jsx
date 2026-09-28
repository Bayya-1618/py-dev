import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";

/* ---------------- DATA (20 objects, 5 keys each) ---------------- */
const users = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", city: "Hyderabad", role: "Frontend Developer" },
  { id: 2, name: "Priya Reddy", email: "priya@example.com", city: "Bengaluru", role: "UI Designer" },
  { id: 3, name: "Rohan Mehta", email: "rohan@example.com", city: "Mumbai", role: "Backend Developer" },
  { id: 4, name: "Sneha Iyer", email: "sneha@example.com", city: "Chennai", role: "QA Engineer" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", city: "Delhi", role: "DevOps Engineer" },
  { id: 6, name: "Ananya Das", email: "ananya@example.com", city: "Kolkata", role: "Product Manager" },
  { id: 7, name: "Karthik Nair", email: "karthik@example.com", city: "Kochi", role: "Full Stack Developer" },
  { id: 8, name: "Meera Joshi", email: "meera@example.com", city: "Pune", role: "Data Analyst" },
  { id: 9, name: "Arjun Patel", email: "arjun@example.com", city: "Ahmedabad", role: "Mobile Developer" },
  { id: 10, name: "Divya Menon", email: "divya@example.com", city: "Trivandrum", role: "Business Analyst" },
  { id: 11, name: "Rahul Verma", email: "rahul@example.com", city: "Lucknow", role: "System Admin" },
  { id: 12, name: "Kavya Rao", email: "kavya@example.com", city: "Mysuru", role: "UX Researcher" },
  { id: 13, name: "Siddharth Gupta", email: "siddharth@example.com", city: "Jaipur", role: "Cloud Architect" },
  { id: 14, name: "Nisha Kapoor", email: "nisha@example.com", city: "Chandigarh", role: "HR Manager" },
  { id: 15, name: "Manoj Kumar", email: "manoj@example.com", city: "Patna", role: "Support Engineer" },
  { id: 16, name: "Ishita Bose", email: "ishita@example.com", city: "Bhubaneswar", role: "Content Writer" },
  { id: 17, name: "Tarun Chowdary", email: "tarun@example.com", city: "Vijayawada", role: "React Developer" },
  { id: 18, name: "Lakshmi Pillai", email: "lakshmi@example.com", city: "Coimbatore", role: "Scrum Master" },
  { id: 19, name: "Harsh Vardhan", email: "harsh@example.com", city: "Indore", role: "Security Analyst" },
  { id: 20, name: "Pooja Naidu", email: "pooja@example.com", city: "Visakhapatnam", role: "Tech Lead" },
];

const PER_PAGE = 5;

/* ---------------- STYLES ---------------- */
const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "Segoe UI", system-ui, sans-serif;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  min-height: 100vh;
  color: #1e293b;
}
.page { max-width: 960px; margin: 0 auto; padding: 40px 16px; }
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(30, 41, 59, 0.08);
  padding: 28px;
}
.title { font-size: 1.75rem; font-weight: 700; color: #312e81; }
.subtitle { color: #64748b; margin: 4px 0 24px; }

.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  background: #4f46e5;
  color: #fff;
  padding: 12px 16px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.table th:first-child { border-top-left-radius: 10px; }
.table th:last-child { border-top-right-radius: 10px; }
.table td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; }
.table tbody tr:hover { background: #eef2ff; }
.role {
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.btn:hover:not(:disabled) { background: #3730a3; transform: translateY(-1px); }
.btn:disabled { background: #cbd5e1; color: #64748b; cursor: not-allowed; }
.page-info {
  font-weight: 600;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 8px;
}
.range { text-align: center; color: #64748b; font-size: 0.85rem; margin-top: 12px; }

/* Responsive: table rows become cards on small screens */
@media (max-width: 640px) {
  .card { padding: 16px; }
  .table thead { display: none; }
  .table, .table tbody, .table tr, .table td { display: block; width: 100%; }
  .table tr {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 8px 0;
  }
  .table td {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    border: none;
    padding: 8px 16px;
    text-align: right;
  }
  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #64748b;
    text-align: left;
  }
}
`;

/* ---------------- USERS PAGE ---------------- */
function Users() {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(users.length / PER_PAGE);

  // Read page from URL (?page=2). Fall back to 1 if missing/invalid, clamp to valid range.
  const pageFromUrl = parseInt(searchParams.get("page"), 10);
  const currentPage = Number.isNaN(pageFromUrl)
    ? 1
    : Math.min(Math.max(pageFromUrl, 1), totalPages);

  const startIndex = (currentPage - 1) * PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + PER_PAGE);

  const goToPage = (page) => setSearchParams({ page });

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Team Directory</h1>
        <p className="subtitle">Pagination powered by useSearchParams</p>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="City">{user.city}</td>
                <td data-label="Role">
                  <span className="role">{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>

        <p className="range">
          Showing {startIndex + 1}–{startIndex + currentUsers.length} of {users.length} records
        </p>
      </div>
    </div>
  );
}

/* ---------------- APP (Router setup) ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <style>{css}</style>
      <Routes>
        <Route path="/" element={<Navigate to="/users?page=1" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/users?page=1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
