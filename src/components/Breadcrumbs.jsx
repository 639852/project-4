import { Link, Outlet } from "react-router-dom";

const Breadcrumbs = ({ links }) => (
  <>
    <div className="breadcrumbs">
      {
        links.map((link, index, array) =>
          (index === array.length - 1)
            ? <span className="breadcrumbs__text" key={ link.id }>{ link.text }</span>
            : <Link to={ link.url } className="breadcrumbs__link" key={ link.id }>{ link.text }</Link>
        )
      }
    </div>
    <Outlet/>
  </>
);

export default Breadcrumbs;
