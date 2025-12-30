// event-card.js — UI helper used by dashboard.html

(function(){
  function el(tag, attrs){
    const n = document.createElement(tag);
    if(attrs){
      Object.entries(attrs).forEach(([k,v])=>{
        if(k === 'className') n.className = v;
        else if(k === 'text') n.textContent = v;
        else if(k === 'html') n.innerHTML = v;
        else n.setAttribute(k, v);
      });
    }
    return n;
  }

  // Signature expected by dashboard.html:
  // renderEventCard(ev, user, myRegsSet, onRegister, onDetails, onEditImage)
  window.renderEventCard = function renderEventCard(ev, user, myRegs, handleRegister, openDetailsModal, handleEditImage){
    const card = el('article', { className:'event-card' });

    if(ev.image){
      const img = el('img', { className:'event-thumb', alt:'', src: ev.image });
      card.appendChild(img);
    } else {
      const ph = el('div', { className:'event-thumb no-image' });
      card.appendChild(ph);
    }

    const body = el('div', { className:'card-body' });
    const title = el('strong', { text: ev.title || 'Untitled event' });
    body.appendChild(title);

    const meta = el('div', { className:'meta', text:'' });
    body.appendChild(meta);

    const actions = el('div', { className:'ev-actions' });

    const detailsBtn = el('button', { className:'btn-ghost', type:'button' });
    detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', function(){
      const editable = !!user && !!ev.ownerId && ev.ownerId === user.id;
      if(typeof openDetailsModal === 'function') openDetailsModal(ev, editable);
    });
    actions.appendChild(detailsBtn);

    const isOwner = !!user && !!ev.ownerId && ev.ownerId === user.id;
    const isRegistered = myRegs && typeof myRegs.has === 'function' ? myRegs.has(ev.id) : false;

    if(isOwner){
      const editImgBtn = el('button', { className:'btn-ghost', type:'button' });
      editImgBtn.textContent = 'Edit image';
      editImgBtn.addEventListener('click', function(){
        if(typeof handleEditImage === 'function') handleEditImage(ev.id);
      });
      actions.appendChild(editImgBtn);
    } else {
      const regBtn = el('button', { className:'btn-primary small', type:'button' });
      regBtn.textContent = isRegistered ? 'Registered' : 'Register';
      regBtn.disabled = isRegistered;

      regBtn.addEventListener('click', function(){
        if(typeof handleRegister === 'function') handleRegister(ev.id, regBtn);
      });

      actions.appendChild(regBtn);
    }

    body.appendChild(actions);
    card.appendChild(body);
    return card;
  };
})();
