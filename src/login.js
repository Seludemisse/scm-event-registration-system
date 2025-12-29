// login.js — client-side auth using localStorage (JSON). 
// Stores users as an array under key 'ers_users' (JSON string). 
// Uses Web Crypto (SHA-256) with per-user salt to store password hashes.

// Utility: convert ArrayBuffer to hex
function toHex(buffer){
  return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

// generate random salt
function genSalt(){
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return toHex(arr);
}

// hash password with salt using SHA-256
async function hashPassword(password, salt){
  const enc = new TextEncoder();
  const data = enc.encode(salt + password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
}

function getUsers(){
  try{
    return JSON.parse(localStorage.getItem('ers_users') || '[]');
  }catch(e){
    return [];
  }
}

function saveUsers(users){
  localStorage.setItem('ers_users', JSON.stringify(users, null, 2));
}

function findUserByEmail(email){
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
}

async function createUser({firstName,lastName,email,password}){
  if(findUserByEmail(email)) throw new Error('Email already registered');
  const salt = genSalt();
  const passwordHash = await hashPassword(password, salt);
  const user = { id: 'u_' + Date.now(), firstName, lastName, email, passwordHash, salt, createdAt: new Date().toISOString() };
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

async function verifyUser(email, password){
  const user = findUserByEmail(email);
  if(!user) return null;
  const h = await hashPassword(password, user.salt);
  return h === user.passwordHash ? user : null;
}

function setSession(user){
  const session = { id: user.id, email: user.email, firstName: user.firstName, createdAt: user.createdAt };
  localStorage.setItem('ers_session', JSON.stringify(session));
}

// Handle signup and signin
document.addEventListener('DOMContentLoaded', function(){
  const signup = document.getElementById('signupForm');
  if(signup){
    signup.addEventListener('submit', async function(e){
      e.preventDefault();
      const first = document.getElementById('firstName').value.trim();
      const last = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const pass = document.getElementById('password').value;
      if(!first || !last || !email || pass.length < 8){
        alert('Please complete all fields and ensure password is at least 8 characters.');
        return;
      }
      try{
        const user = await createUser({firstName:first,lastName:last,email,password:pass});
        setSession(user);
        // redirect to dashboard
        window.location = 'dashboard.html';
      }catch(err){
        alert(err.message || 'Could not create account');
      }
    });
  }

  // Handle login form if present
  const login = document.getElementById('loginForm');
  if(login){
    login.addEventListener('submit', async function(e){
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;
      if(!email || !pass){
        alert('Please enter email and password');
        return;
      }
      const user = await verifyUser(email, pass);
      if(!user){
        alert('Invalid email or password');
        return;
      }
      setSession(user);
      window.location = 'dashboard.html';
    });
  }
});
