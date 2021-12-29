import { useEffect } from "react";

const EditTask = ({ setLinks }) => {
  useEffect(() => setLinks([
    { id: 1, text: 'Issue Boards', url: '/' },
    { id: 2, text: 'Edit issue', url: '/task-:id/edit' }
  ]), []);
  
  return (
    <div className="task">
      Edit
    </div>
  );
}

export default EditTask;
