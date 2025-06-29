import express from 'express';

const router = express.Router();

// Mock authentication endpoints for MVP
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Mock successful signup
    const user = {
      id: 'user_' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    res.json({
      success: true,
      user: user,
      message: 'Account created successfully!'
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Mock successful login
    const user = {
      id: 'user_' + Date.now(),
      email: email,
      last_login: new Date().toISOString()
    };

    res.json({
      success: true,
      user: user,
      message: 'Login successful!'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;