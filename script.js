let t0, et = 0, loop, active = false, laps = [];

const d = document.getElementById('disp'),
    sb = document.getElementById('sBtn'),
    si = document.getElementById('sIco'),
    st = document.getElementById('sTxt'),
    lb = document.getElementById('lBtn'),
    rb = document.getElementById('rBtn'),
    li = document.getElementById('list'),
    pb = document.getElementById('bar');

function fmt(t) {
    let m = Math.floor(t / 60000),
        s = Math.floor((t % 60000) / 1000),
        ms = Math.floor((t % 1000) / 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}<span class="text-3xl text-fuchsia-500/80">.${ms.toString().padStart(2, "0")}</span>`;
}

function toggle() {
    if (!active) {
        t0 = Date.now() - et;
        loop = setInterval(() => {
            et = Date.now() - t0;
            d.innerHTML = fmt(et);
            pb.style.width = `${(et % 60000) / 600}%`;
        }, 10);
        st.innerText = "PAUSE";
        si.className = "fas fa-pause text-xs";
        sb.classList.add('bg-fuchsia-600', 'text-white');
        sb.classList.remove('bg-white', 'text-black');
        lb.disabled = false;
        active = true;
    } else {
        clearInterval(loop);
        st.innerText = "RESUME";
        si.className = "fas fa-play text-xs";
        sb.classList.remove('bg-fuchsia-600', 'text-white');
        sb.classList.add('bg-white', 'text-black');
        active = false;
    }
}

function addLap() {
    laps.unshift(et);
    li.classList.remove('hidden');
    const row = document.createElement('div');
    row.className = "lap-anim glass p-5 rounded-2xl flex justify-between items-center text-xs";
    row.innerHTML = `
                <span class="text-slate-500 font-bold uppercase tracking-tighter">Lap ${laps.length}</span>
                <span class="mono font-bold text-white text-lg">${fmt(et)}</span>
            `;
    li.prepend(row);
}

function reset() {
    clearInterval(loop);
    et = 0; active = false; laps = [];
    d.innerHTML = `00:00<span class="text-3xl text-fuchsia-500/80">.00</span>`;
    li.innerHTML = "";
    li.classList.add('hidden');
    pb.style.width = "0%";
    st.innerText = "START";
    si.className = "fas fa-play text-xs";
    sb.className = sb.className.replace(/bg-fuchsia-600|text-white/g, '').trim();
    sb.classList.add('bg-white', 'text-black');
    lb.disabled = true;
}

sb.onclick = toggle;
lb.onclick = addLap;
rb.onclick = reset;

