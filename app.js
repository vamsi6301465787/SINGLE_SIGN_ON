const express=require('express');
const app=express();

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'RTjmNhC1GrRT-A4NZm48CGqiVTBc_y2Pc5w0qbjts2oacd0JpbL3cGShwENC3TRP',
  baseURL: 'http://localhost:3000',
  clientID: '39ACvaP26nOOVekJGhyfHdd9qmGfwAyF',
  issuerBaseURL: 'https://dev-e23ehau7.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


const port =process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening to the port 3000');
});