import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Board from '../components/Board';

const IssueBoard = ({ setLinks, searchTask, columns, dragStartHandler, dropHandler, dropColumnHandler }) => {
  useEffect(() => setLinks([{ id: 1, text: 'Issue Boards', url: '/' }]), []);
  
  return (
    <>
      <div className='issue'>
        <h1>Issue Boards</h1>
        <Link to='/task' className='issue__button button button_orange'>New issue</Link>
      </div>

      <Search search={ searchTask }/>

      <Board
        columns={ columns }
        dragStartHandler={ dragStartHandler }
        dropHandler={ dropHandler }
        dropColumnHandler={ dropColumnHandler }
      />
    </>
  );
}

export default IssueBoard;
