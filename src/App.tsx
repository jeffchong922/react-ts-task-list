import React from 'react';

import Header from './components/Header';
import SelectList from './components/SelectList';
import ExistLists from './components/ExistLists';
import ExistTasks from './components/ExistTasks';
import NewListCard from './components/NewListCard';
import NewTaskForm from './components/NewTaskForm';
import EditListModal from './components/EditListModal';
import EditTaskModal from './components/EditTaskModal';
import DeleteListModal from './components/DeleteListModal';
import DeleteTaskModal from './components/DeleteTaskModal';

const App: React.FC = () => {
  return (
    <>
      <Header title="任务列表 📕" className="mb-5"
        subtitle="创建列表，并在每个列表中添加任务"
      />
      
      <div className="container px-3">
        <div className="columns">
          <div className="column is-3">
            <NewListCard className="mb-5"/>
            <ExistLists/>
          </div>
          <div className="column is-9">
            <div className="box">
              <SelectList className="mb-5"/>
              <div className="columns">
                <div className="column is-5">
                  <NewTaskForm className="mb-5"/>
                </div>
                <div className="column is-7">
                  <ExistTasks className="mb-5"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteListModal/>
      <EditListModal/>
      <DeleteTaskModal/>
      <EditTaskModal/>
    </>
  )
}

export default App;
