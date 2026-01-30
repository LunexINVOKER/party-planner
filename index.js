const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2601-ftb-et-web-ft';

const state = {
  party_list: [],
  chosen: null
};

async function fetchParties() {
  try {
    const response = await fetch(`${API_URL}/events`);
    const json = await response.json();
    state.party_list = json.data;
    render();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchPartyById(id) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    const json = await response.json();
    state.chosen = json.data;
    render();
  } catch (error) {
    console.error('Error:', error);
  }
}

function PartyList() {
  const section = document.createElement('div');
  section.className = 'party-list';
  section.innerHTML = `
    <h2>Upcoming Parties</h2>
    <ul id="parties-ul">${state.party_list.map(party => `<li data-id="${party.id}">${party.name}</li>`).join('')}</ul>`;
  return section;
}

function PartyDetails() {
  const section = document.createElement('div');
  section.className = 'party-details';
  
  if (!state.chosen) {
    section.innerHTML = `
      <h2>Party Details</h2>
      <p>Please select a party to see the details.</p>
    `;
  } else {
    const party = state.chosen;
    const date = new Date(party.date).toLocaleDateString();
    
    section.innerHTML = `
      <h2>Party Details</h2>
      <h3>${party.name} #${party.id}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p>${party.description}</p>
    `;
  }
  
  return section;
}

function render() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <h1>Party Planner</h1>
    <div class="container">
      <div id="party-list"></div>
      <div id="party-details"></div>
    </div>
  `;
  
  app.querySelector('#party-list').replaceWith(PartyList());
  app.querySelector('#party-details').replaceWith(PartyDetails());
  
  document.querySelectorAll('#parties-ul li').forEach(li => {
    li.addEventListener('click', () => {
      const id = li.dataset.id;
      fetchPartyById(id);
    });
  });
}

async function init() {
  await fetchParties();
}

init();