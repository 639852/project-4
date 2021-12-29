import BoardColumn from "./BoardColumn";

const Board = ({ columns, dragStartHandler, dropHandler, dropColumnHandler }) => (
  <div className="board">
    {
      columns.map((column) =>
        <BoardColumn
          column={ column }
          dragStartHandler={ dragStartHandler }
          dropHandler={ dropHandler }
          dropColumnHandler={ dropColumnHandler }
          className="board__column"
          title={ column.title }
          items={ column.items }
          key={ column.id }
        />
      )
    }
  </div>
)

export default Board;
