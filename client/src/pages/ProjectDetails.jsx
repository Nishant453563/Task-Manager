import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Plus, Users, Calendar, MoreVertical, Trash2, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, Reorder } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '', deadline: '' });
  const [users, setUsers] = useState([]);
  const { isAdmin, user: currentUser } = useAuth();

  useEffect(() => {
    fetchProjectDetails();
    fetchTasks();
    if (isAdmin) fetchUsers();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error('Error fetching project:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/project/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
      // In a real app, we'd have a search or list of users
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { ...newTask, projectId: id });
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', assignedTo: '', deadline: '' });
      fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const columns = [
    { id: 'Todo', title: 'To Do', icon: ListTodo, color: 'text-slate-400' },
    { id: 'In Progress', title: 'In Progress', icon: Clock, color: 'text-amber-400' },
    { id: 'Completed', title: 'Completed', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  if (loading) return <div className="text-white">Loading project...</div>;
  if (!project) return <div className="text-white">Project not found.</div>;

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <h2 className="text-3xl font-bold text-white">{project.name}</h2>
             <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs border border-primary-500/20">Active</span>
          </div>
          <p className="text-slate-400 max-w-2xl">{project.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {project.members?.slice(0, 3).map((m, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-300" title={m.name}>
                {m.name.charAt(0)}
              </div>
            ))}
            {project.members?.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-300">
                +{project.members.length - 3}
              </div>
            )}
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
            >
              <Plus size={18} />
              Add Task
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden min-h-[600px]">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col h-full glass rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <col.icon className={col.color} size={18} />
                <h3 className="font-bold text-slate-200">{col.title}</h3>
                <span className="text-xs bg-white/5 text-slate-500 px-2 py-0.5 rounded-md">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <motion.div
                  key={task._id}
                  layoutId={task._id}
                  className="glass-card p-4 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-200 text-sm group-hover:text-primary-400 transition-colors">{task.title}</h4>
                    {isAdmin && (
                      <button onClick={() => deleteTask(task._id)} className="text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mb-4 line-clamp-2">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center text-[10px] text-primary-400 border border-primary-500/20">
                            {task.assignedTo?.name?.charAt(0) || '?'}
                        </div>
                        <span className="text-[10px] text-slate-400">{task.assignedTo?.name || 'Unassigned'}</span>
                    </div>
                    {task.deadline && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Calendar size={10} />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                    {col.id !== 'Todo' && (
                        <button onClick={() => updateStatus(task._id, col.id === 'Completed' ? 'In Progress' : 'Todo')} className="text-[10px] text-slate-500 hover:text-white px-2 py-1 rounded bg-white/5">
                            Move Back
                        </button>
                    )}
                    {col.id !== 'Completed' && (
                        <button onClick={() => updateStatus(task._id, col.id === 'Todo' ? 'In Progress' : 'Completed')} className="text-[10px] text-primary-400 hover:text-primary-300 px-2 py-1 rounded bg-primary-500/10">
                            {col.id === 'Todo' ? 'Start' : 'Complete'}
                        </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Add New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 min-h-[80px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
