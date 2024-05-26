const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const fetch = require('node-fetch');

const app = express();

// Set up session middleware
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub OAuth strategy
passport.use(new GitHubStrategy({
    clientID: 'Ov23lizmvAY8C3aWpudw',
    clientSecret: 'c6788224998b150d2fcb441ab8962ed8605ba57a',
    callbackURL: 'https://sebastianlopez2000.github.io/portfolio/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // This function is called after successful authentication
    // You can save the accessToken or use it to make requests to GitHub's API
    return done(null, accessToken);
  }
));

// Serialize user into the session
passport.serializeUser((accessToken, done) => {
  done(null, accessToken);
});

// Deserialize user from the session
passport.deserializeUser((accessToken, done) => {
  done(null, accessToken);
});

// Define route to fetch GitHub projects
app.get('/github-projects', passport.authenticate('github', { session: false }), async (req, res) => {
    try {
        const accessToken = req.user;
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'your-app-name' // Provide a User-Agent header as required by GitHub API
            }
        });
        const projects = await response.json();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        res.status(500).json({ error: 'Error fetching GitHub projects' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
