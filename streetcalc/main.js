
let query="https://maps.mail.ru/osm/tools/overpass/api/interpreter?data=\[out\:json\];area\[name=\"Уфа\"\];way(area)\[name\]\[highway\];out geom;";

let els = {
    cityInput: undefined,
    statusDiv: undefined,
    resultDiv: undefined
}

let data = {
    streets: undefined,
    buckets: []
}

// degree, tan, sin, cos

let trig = [
    [-90, -1.63246E+16, -1, 0],
    [-80, -5.67128182, -0.984807753, 0.173648178],
    [-70, -2.747477419, -0.939692621, 0.342020143],
    [-60, -1.732050808, -0.866025404, 0.5],
    [-50, -1.191753593, -0.766044443, 0.64278761],
    [-40, -0.839099631, -0.64278761, 0.766044443],
    [-30, -0.577350269, -0.5, 0.866025404],
    [-20, -0.363970234, -0.342020143, 0.939692621],
    [-10, -0.176326981, -0.173648178, 0.984807753],    
    [0, 0, 0, 1],
    [10, 0.176326981, 0.173648178, 0.984807753],
    [20, 0.363970234, 0.342020143, 0.939692621],
    [30, 0.577350269, 0.5, 0.866025404],
    [40, 0.839099631, 0.64278761, 0.766044443],
    [50, 1.191753593, 0.766044443, 0.64278761],
    [60, 1.732050808, 0.866025404, 0.5],
    [70, 2.747477419, 0.939692621, 0.342020143],
    [80, 5.67128182, 0.984807753, 0.173648178],
    [90, 1.63246E+16, 1, 0]
]

window.onload = function() {    
    let btnGo = document.getElementById("btnGo");
    els.statusDiv = document.getElementById("status");
    els.resultDiv = document.getElementById("result");
    els.cityInput = document.getElementById("city")
    btnGo.onclick = function(e) {
        e.preventDefault();
        console.log("Click!");
        fetchStreets();
    }
}

function fetchStreets() {
    let city = els.cityInput.value;
    if (!city) {
        return;
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        data.streets = JSON.parse(this.responseText);
        els.statusDiv.innerText = `Fetched ${data.streets.elements.length} streets`
        processStreets();
    }
    els.statusDiv.innerText = "Fetching data..."
    xhttp.open("POST", "https://maps.mail.ru/osm/tools/overpass/api/interpreter", true);
    xhttp.send(`[out:json];
    area[name=${JSON.stringify(els.cityInput.value)}];
    way(area)[name][highway];
    out geom;`)
}

function processStreets() {
    els.resultDiv.innerHTML = "";
    data.buckets = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let segments = 0;    
    for (let street of data.streets.elements) {
        if (!validStreetType(street.tags.highway)) {
            continue;
        }
        for (let idx = 0; idx < street.geometry.length - 1; ++idx){
            let node1 = street.geometry[idx];
            let node2 = street.geometry[idx+1];
            let b = getBucket(node1, node2);
            let l = getLength(node1, node2);    
            data.buckets[b] += l;
            segments += 1;
        }
    }
    console.log(`Processed ${segments} segments`);    
    normalizeBuckets();
    console.log(data.buckets);
    let svg = genSvg();
    els.resultDiv.innerHTML = svg;
}

function validStreetType(t) {
    return (t == "motorway") || (t == "trunk") || (t == "primary") || (t == "secondary") ||  (t == "tertiary")
}

function getBucket(node1, node2) {
    let {lon:lon1, lat:lat1} = node1;
    let {lon:lon2, lat:lat2} = node2;  
    let dx = getLength({lon: lon1, lat: lat1}, {lon: lon2, lat:lat1})
    let dy = getLength({lon: lon1, lat: lat1}, {lon: lon1, lat:lat2})
    if (lon2 < lon1) {
        dx = -dx;
    }

    if (lat2 < lat1) {
        dy = -dy;
    }

    const tan = dy/dx
    if (isNaN(tan)) {        
        return 0;
    }
    if (tan < trig[0][1]) {        
        return trig.length - 1;
    }
    for (let idx = 0; idx < trig.length - 1; ++idx) {
        if (tan < trig[idx+1][1]) {            
            return idx
        }
    }
    return trig.length - 1
}

function getLength(node1, node2) {
    let {lon:lon1, lat:lat1} = node1;
    let {lon:lon2, lat:lat2} = node2;    
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}

function maxBucket() {    
    return Math.max(...data.buckets);
}

function normalizeBuckets() {
    const max = maxBucket();
    console.log(max);
    for (let idx = 0; idx < data.buckets.length; ++idx) {
        data.buckets[idx] = data.buckets[idx] / max;
    }
}

function genSvg() {
    const cx = 250;
    const cy = 250;
    const r = 250
    let result = `<svg width="500" height="500">
    <circle cx="${cx}" cy="${cy}" r="${r}" stroke="gray" stroke-width="1" fill="none"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.75}" stroke="gray" stroke-width="1" fill="none"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.5}" stroke="gray" stroke-width="1" fill="none"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.25}" stroke="gray" stroke-width="1" fill="none"/>
    `;
    
    for (let idx = 0; idx < data.buckets.length; ++idx) {
        let nextIdx = idx == data.buckets.length - 1 ? 0 : idx + 1;
        let b = data.buckets[idx];
        let [angle1, tan1, sin1, cos1] = trig[idx];
        let [angle2, tan2, sin2, cos2] = trig[nextIdx];
        let br = r*b;
        let color = "lightblue";
        // let color = idx % 2 == 0 ? "lightblue" : "lightgreen"
        result += `<!-- ${angle1} ${angle2} ${br} --><path d="M ${cx} ${cy} L ${cx + br*cos1} ${cy + br*sin1} A ${br} ${br}  0 0 1 ${cx + br*cos2} ${cy + br*sin2} M ${cx} ${cy}"  stroke="darkgray" stroke-width="1" fill="${color}"/>`
        result += `<!-- ${angle1} ${angle2} ${br} --><path d="M ${cx} ${cy} L ${cx - br*cos1} ${cy - br*sin1} A ${br} ${br}  0 0 1 ${cx - br*cos2} ${cy - br*sin2} M ${cx} ${cy}"  stroke="darkgray" stroke-width="1" fill="${color}"/>`
    }
    result += "</svg>";
    return result;
}

function test() {
    t({lon:0, lat: 0}, {lon:0, lat: 1});
    t({lon:0, lat: 0}, {lon:1, lat: 0});
    t({lon:0, lat: 0}, {lon:1, lat: 1});
    t({lon:0, lat: 0}, {lon:1, lat: 2});
    t({lon:0, lat: 0}, {lon:2, lat: 1});

    function t(n1, n2) {
        let b = getBucket(n1, n2);
        let angle = trig[b][0];
        console.log(n1, n2, angle, b);
    }
}