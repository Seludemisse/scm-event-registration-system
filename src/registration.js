// registration.js — shared helpers for registrations (localStorage)

function getSession(){
  const raw = localStorage.getItem('ers_session');
  if(!raw) return null;
  try{ return JSON.parse(raw); }catch(e){ return null; }
}

function requireSession(){
  const s = getSession();
  if(!s){ window.location = 'login.html'; throw new Error('No session'); }
  return s;
}

function getEvents(){
  try{ return JSON.parse(localStorage.getItem('ers_events') || '[]'); }catch(e){ return []; }
}

function getRegistrations(){
  try{ return JSON.parse(localStorage.getItem('ers_registrations') || '{}'); }catch(e){ return {}; }
}

function saveRegistrations(regs){
  localStorage.setItem('ers_registrations', JSON.stringify(regs, null, 2));
}

function getMyRegisteredIds(userId){
  const regs = getRegistrations();
  return new Set(regs[userId] || []);
}

function canRegister({ userId, event }){
  if(!event) return { ok:false, reason:'Event not found' };
  if(event.ownerId && event.ownerId === userId) return { ok:false, reason:'You cannot register for your own event' };
  const mine = getMyRegisteredIds(userId);
  if(mine.has(event.id)) return { ok:false, reason:'You are already registered for this event' };
  return { ok:true };
}

function registerForEvent(userId, eventId){
  const events = getEvents();
  const event = events.find(e => e.id === eventId);
  const check = canRegister({ userId, event });
  if(!check.ok) return check;

  const regs = getRegistrations();
  const list = new Set(regs[userId] || []);
  list.add(eventId);
  regs[userId] = Array.from(list);
  saveRegistrations(regs);

  return { ok:true };
}

function unregisterFromEvent(userId, eventId){
  const regs = getRegistrations();
  const list = new Set(regs[userId] || []);
  list.delete(eventId);
  regs[userId] = Array.from(list);
  saveRegistrations(regs);
  return { ok:true };
}
