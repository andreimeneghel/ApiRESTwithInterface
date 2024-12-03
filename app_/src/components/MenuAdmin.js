import Link from "next/link";

export default function MenuAdmin() {
    return (

    <div className="d-flex justify-content-start">
        <div className="sidebar">
      <ul className="menu-list">
        <li>
          <Link href="/admin">Users</Link>
        </li>
        <li>
          <Link href="/admin/appointments">Appointments</Link>
        </li>
        <li>
          <Link href="/admin/students">Students</Link>
        </li>
        <li>
          <Link  href="/admin/events">Events</Link>
        </li>
          <Link href="/admin/teachers">Teachers</Link>
        <li>
          <Link href="/admin/professionals">Professionals</Link>
        </li>
      </ul>
    </div>
    </div>

    )
}
