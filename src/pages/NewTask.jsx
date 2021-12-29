import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewTask = ({ setLinks, task }) => {
  useEffect(() => setLinks([
    { id: 1, text: 'Issue Boards', url: '/' },
    { id: 2, text: 'New issue', url: '/task' }
  ]), []);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function addTask(data) {
    const id = (Math.random() * 100).toFixed(0);

    task({ id, ...data, priority: data.priority.toLowerCase() });

    navigate('/');
  }

  return (
    <form className="new-issue" onSubmit={ handleSubmit(addTask) }>
      <input { ...register('title', { required: true }) } type="text" placeholder="Title *" className="new-issue__input"/>
      { errors?.title && <p className="error">This field is required!</p> }
      <div className="new-issue__block">
        <label className="new-issue__arrow">
          <select { ...register('priority') } className="new-issue__select" defaultValue={ 0 }>
            <option value="0" disabled>Priority</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Normal">Normal</option>
            <option value="Unknown">Unknown</option>
          </select>
        </label>
        <input { ...register('storyPoints', { valueAsNumber: true }) } type="number" placeholder="Story points" className="new-issue__input"/>
        <label className="new-issue__arrow">
          <select { ...register('status') } className="new-issue__select" defaultValue={ 0 }>
            <option value="0" disabled>Status</option>
            <option value="To Do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="Test">Test</option>
            <option value="Done">Done</option>
          </select>
        </label>
      </div>
      <textarea { ...register('description') } placeholder="Description" className="new-issue__text"></textarea>
      <button className="button button_blue">Save</button>
    </form>
  );
}

export default NewTask;
