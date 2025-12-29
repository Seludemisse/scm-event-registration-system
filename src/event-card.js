// event-card.js - Shared component for rendering event cards
function renderEventCard(ev, user, myRegs, onRegister, onDetails, onEditImage) {
  const card = document.createElement('article');
  card.className = 'event-card';

  const thumb = document.createElement('img');
  thumb.className = 'event-thumb';
  if (ev.image) {
    thumb.src = ev.image;
    thumb.alt = ev.title;
  } else {
    thumb.classList.add('no-image');
    thumb.alt = '';
  }
  card.appendChild(thumb);

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.style.margin = '0';
  title.textContent = ev.title;
  body.appendChild(title);

  if (ev.description) {
    const desc = document.createElement('p');
    desc.className = 'description';
    desc.textContent = ev.description;
    body.appendChild(desc);

    // Add a "Read more" link if the description is long
    if (ev.description.length > 100) { // Simple length check
      const readMore = document.createElement('a');
      readMore.href = '#';
      readMore.textContent = 'Read more...';
      readMore.className = 'link';
      readMore.style.fontSize = '13px';
      readMore.onclick = (e) => {
        e.preventDefault();
        onDetails(ev, ev.ownerId === user.id);
      };
      body.appendChild(readMore);
    }
  }

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = `${ev.date || 'No date'} • ${ev.location || 'No location'}`;
  body.appendChild(meta);

  const actions = document.createElement('div');
  actions.className = 'ev-actions';

  if (ev.ownerId === user.id) {
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-ghost';
    editBtn.textContent = 'Details / Edit';
    editBtn.onclick = () => onDetails(ev, true);
    actions.appendChild(editBtn);
  } else {
    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'btn-ghost';
    detailsBtn.textContent = 'View Details';
    detailsBtn.onclick = () => onDetails(ev, false);
    actions.appendChild(detailsBtn);

    const registerBtn = document.createElement('button');
    registerBtn.className = 'btn-primary small';
    if (myRegs.has(ev.id)) {
      registerBtn.textContent = 'Registered';
      registerBtn.disabled = true;
    } else {
      registerBtn.textContent = 'Register';
      registerBtn.onclick = () => onRegister(ev.id, registerBtn);
    }
    actions.appendChild(registerBtn);
  }

  body.appendChild(actions);
  card.appendChild(body);
  return card;
}
