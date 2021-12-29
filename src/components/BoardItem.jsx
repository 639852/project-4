import { Link } from "react-router-dom";

const BoardItem = ({ id, title, priority, storyPoints, description, status, tag = 'a', ...args }) => (
  <div { ...args } className={ `board__item ${tag}` }>
    {
      (tag === 'a')
        ? <Link to={ `/task-${id}` } className="item-title">{ title }</Link>
        : <h1 className="item-title">{ `${id} ${title}` }</h1>
    }
    <img src={ `../img/${priority}.svg` } alt={ priority }/>
    <span className="story-points">{ storyPoints }</span>
    {
      (description)
        ? <>
            <h3 className="column-title">{ status }</h3>
            <button className="issue__button button button_orange">Edit</button>
            <p className="item-text">{ description }</p>
          </>
        : <span className="item-id">{ id }</span>
    }
  </div>
);

export default BoardItem;
