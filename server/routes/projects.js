const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, deleteProject, addMember } = require('../controllers/projects');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, isAdmin, createProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProjectById);
router.delete('/:id', auth, isAdmin, deleteProject);
router.post('/:id/members', auth, isAdmin, addMember);

module.exports = router;
