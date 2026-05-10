const Project = require('../models/Project');
const User = require('../models/User');
const Joi = require('joi');

exports.createProject = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().trim(),
      description: Joi.string().allow('').trim(),
      members: Joi.array().items(Joi.string())
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, description, members } = req.body;
    
    const project = new Project({
      name,
      description,
      members: members || [],
      createdBy: req.user.id
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating project' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const isConnected = require('mongoose').connection.readyState === 1;
    if (!isConnected) {
      return res.json([
        {
          _id: 'p1',
          name: 'Global Expansion',
          description: 'Project to expand operations globally.',
          members: [{ name: 'John Doe', email: 'john@example.com' }],
          createdBy: { name: 'Admin', email: 'admin@demo.com' },
          createdAt: new Date()
        },
        {
          _id: 'p2',
          name: 'Mobile App Revamp',
          description: 'UI/UX overhaul of the existing mobile app.',
          members: [{ name: 'Jane Smith', email: 'jane@example.com' }],
          createdBy: { name: 'Admin', email: 'admin@demo.com' },
          createdAt: new Date()
        }
      ]);
    }

    let query = {};
    if (req.user.role !== 'Admin') {
      query = {
        $or: [
          { members: req.user.id },
          { createdBy: req.user.id }
        ]
      };
    }
    
    const projects = await Project.find(query)
      .populate('members', 'name email')
      .populate('createdBy', 'name email')
      .lean();
    
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email').populate('createdBy', 'name email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check permission
    if (req.user.role !== 'Admin' && !project.members.some(m => m._id.toString() === req.user.id) && project.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this project' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    project.members.push(userId);
    await project.save();
    
    const updatedProject = await Project.findById(req.params.id).populate('members', 'name email');
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
