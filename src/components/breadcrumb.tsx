import { Link, useLocation } from "react-router";

function Breadcrumbs() {
    const location = useLocation();
    const pathname = location.pathname;

    const pathnames = pathname.split("/").filter(x => x);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex">
                <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                </li>

                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return isLast ? (
                        <li className="breadcrumb-item active" aria-current="page" key={index}>
                            / {capitalize(name)}
                        </li>
                    ) : (
                        <li className="breadcrumb-item" key={index}>
                            <Link to={routeTo}>{capitalize(name)}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

// Optional: fungsi untuk kapitalisasi string
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default Breadcrumbs;
