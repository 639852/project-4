import { useState } from "react";
import BoardItem from "./BoardItem";

const BoardColumn = ({ title, items, column, dragStartHandler, dropHandler, dropColumnHandler }) => (
  <div
    className="board__column"
    onDragOver={ (e) => e.preventDefault() }
    onDrop={ (e) => dropColumnHandler(e, column) }
  >
    <h3 className="column-title">{ title }</h3>
    {
      items.map((item) =>
        <BoardItem
          onDragStart={ (e) => dragStartHandler(e, column, item) }
          onDragOver={ (e) => e.preventDefault() }
          onDrop={ (e) => dropHandler(e, column, item) }
          draggable={ true }
          id={ item.id }
          title={ item.title }
          priority={ item.priority }
          storyPoints={ item.storyPoints }
          key={ item.id }
        />
      )
    }
  </div>
);

export default BoardColumn;
