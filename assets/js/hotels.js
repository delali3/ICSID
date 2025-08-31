async function initHotels(){
  const res = await fetch('assets/data/hotels.json');
  const hotels = await res.json();
  const list = document.getElementById('hotels-list');
  const amenitySelect = document.getElementById('filter-amenity');
  const search = document.getElementById('search');

  const amenities = new Set();
  hotels.forEach(h=>h.amenities.forEach(a=>amenities.add(a)));
  Array.from(amenities).sort().forEach(a=>{
    const opt=document.createElement('option');opt.value=a;opt.textContent=a;amenitySelect.appendChild(opt);
  });

  function render(items){
    list.innerHTML='';
    if(items.length===0){list.innerHTML='<li>No hotels found.</li>';return}
    items.forEach(h=>{
      const li=document.createElement('li');li.className='hotel';
      li.innerHTML=`
        <div class="hotel-image">
          <img src="${h.image}" alt="${h.name}" loading="lazy" onerror="this.src='assets/images/hotel-placeholder.svg'">
        </div>
        <div class="hotel-content">
          <div>
            <h3>${h.name}</h3>
            <p class="meta">${h.distance_km_from_venue} km • ${h.price_category} • ${h.rating} ★</p>
            <p>${h.notes}</p>
            <div class="amenities">
              ${h.amenities.map(a=>`<span class="amenity-tag">${a}</span>`).join('')}
            </div>
            <p><a href="${h.website}" target="_blank" rel="noopener">View booking</a></p>
          </div>
          <div class="cta">
            <a class="btn" href="${h.website}" target="_blank" rel="noopener">Book Now</a>
          </div>
        </div>`;
      list.appendChild(li);
    });
  }

  function filterAndRender(){
    const a = amenitySelect.value;
    const q = search.value.trim().toLowerCase();
    const out = hotels.filter(h=>{
      if(a && !h.amenities.includes(a)) return false;
      if(q && !(h.name.toLowerCase().includes(q) || h.notes.toLowerCase().includes(q))) return false;
      return true;
    });
    render(out);
  }

  amenitySelect.addEventListener('change',filterAndRender);
  search.addEventListener('input',filterAndRender);
  render(hotels);
}

document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('hotels-list')) initHotels().catch(console.error);
});
