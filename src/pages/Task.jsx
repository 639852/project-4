import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardItem from "../components/BoardItem";

const Task = ({ setLinks, getItem }) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    setLinks([
      { id: 1, text: 'Issue Boards', url: '/' },
      { id: 2, text: `${id}`, url: '/task-:id' }
    ]);

    setItem(getItem(id));
  }, []);

  const { id } = useParams();

  return (
    <BoardItem
      id={ item.id }
      title={ item.title }
      priority={ item.priority }
      storyPoints={ item.storyPoints }
      key={ item.id }
      description={ item.description }
      status={ item.status }
      tag="task"
    />
  );
}

export default Task;
