// registration.js — registrations in localStorage under `ers_registrations` as { [userId]: [eventId, ...] }

(function(){
  function safeParse(json, fallback){
    try{ return JSON.parse(json); }catch(_){ return fallback; }
  }

  function getRegistrations(){
    return safeParse(localStorage.getItem('ers_registrations') || '{}', {});
  }

  function saveRegistrations(regs){
    localStorage.setItem('ers_registrations', JSON.stringify(regs, null, 2));
  }

  function getEvents(){
    return safeParse(localStorage.getItem('ers_events') || '[]', []);
  }

  function findEvent(eventId){
    return getEvents().find(e => e && e.id === eventId) || null;
  }

  // API used by dashboard.html
  window.registerForEvent = function registerForEvent(userId, eventId){
    if(!userId || !eventId) return { ok:false, reason:'Missing user or event.' };

    const ev = findEvent(eventId);
    if(!ev) return { ok:false, reason:'Event not found.' };

    if(ev.ownerId && ev.ownerId === userId){
      return { ok:false, reason:'You cannot register for your own event.' };
    }

    const regs = getRegistrations();
    const list = Array.isArray(regs[userId]) ? regs[userId] : [];

    if(list.includes(eventId)){
      return { ok:false, reason:'Already registered for this event.' };
    }

    list.push(eventId);
    regs[userId] = list;
    saveRegistrations(regs);

    return { ok:true };
  };

  // API used by my-registered.html
  window.unregisterForEvent = function unregisterForEvent(userId, eventId){
    if(!userId || !eventId) return { ok:false, reason:'Missing user or event.' };

    const regs = getRegistrations();
    const list = Array.isArray(regs[userId]) ? regs[userId] : [];

    if(!list.includes(eventId)){
      return { ok:false, reason:'Not registered for this event.' };
    }

    regs[userId] = list.filter(id => id !== eventId);
    saveRegistrations(regs);

    return { ok:true };
  };

  window.getMyRegistrationIds = function getMyRegistrationIds(userId){
    const regs = getRegistrations();
    return Array.isArray(regs[userId]) ? regs[userId].slice() : [];
  };
})();
