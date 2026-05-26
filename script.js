

// script.js - All your JavaScript code goes here

// Your Google Sheet ID from the URL
const SHEET_ID = '1phdGeu1v23G3VCVaiQjD3H91WE5juE0wzw7-_arGdis';

async function loadDataToTables() {
    try {
        // Fetch data from Google Sheets
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        
        const rows = json.table.rows;
        
        if (rows.length <= 1) {
            return;
        }
        
        const personalTbody = document.querySelector('.personal-table .data-table tbody');
        const schoolTbody = document.querySelector('.school-table .data-table tbody');
        const healthTbody = document.querySelector('.health-table .data-table tbody');
        
        if (personalTbody) personalTbody.innerHTML = '';
        if (schoolTbody) schoolTbody.innerHTML = '';
        if (healthTbody) healthTbody.innerHTML = '';
        
        let personalCount = 0;
        let schoolCount = 0;
        let healthCount = 0;
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].c;
            if (!row) continue;
            
            const firstName = row[1] ? row[1].v : '—';
            const lastName = row[2] ? row[2].v : '—';
            const age = row[3] ? row[3].v : '—';
            const gender = row[4] ? row[4].v : '—';
            const address = row[5] ? row[5].v : '—';
            
            const gradeSection = row[6] ? row[6].v : '—';
            const subject = row[7] ? row[7].v : '—';
            const teacherRating = row[8] ? row[8].v : '—';
            const favoriteLesson = row[9] ? row[9].v : '—';
            const suggestions = row[10] ? row[10].v : '—';
            
            const vaccinationStatus = row[11] ? row[11].v : '—';
            const symptomFever = row[12] ? row[12].v : '—';
            const symptomCough = row[13] ? row[13].v : '—';
            const symptomFatigue = row[14] ? row[14].v : '—';
            const lastMedicalCheckup = row[15] ? row[15].v : '—';
            const healthNotes = row[16] ? row[16].v : '—';
            
            if (firstName === '—' && lastName === '—' && gradeSection === '—') continue;
            
            if (personalTbody) {
                const personalRow = personalTbody.insertRow();
                personalRow.insertCell(0).innerText = firstName;
                personalRow.insertCell(1).innerText = lastName;
                personalRow.insertCell(2).innerText = age;
                personalRow.insertCell(3).innerText = gender;
                personalRow.insertCell(4).innerText = address;
                personalCount++;
            }
            
            if (schoolTbody) {
                const schoolRow = schoolTbody.insertRow();
                schoolRow.insertCell(0).innerText = gradeSection;
                schoolRow.insertCell(1).innerText = subject;
                schoolRow.insertCell(2).innerText = teacherRating;
                schoolRow.insertCell(3).innerText = favoriteLesson;
                schoolRow.insertCell(4).innerText = suggestions;
                schoolCount++;
            }
            
            if (healthTbody) {
                const healthRow = healthTbody.insertRow();
                healthRow.insertCell(0).innerText = vaccinationStatus;
                healthRow.insertCell(1).innerText = symptomFever || '—';
                healthRow.insertCell(2).innerText = symptomCough || '—';
                healthRow.insertCell(3).innerText = symptomFatigue || '—';
                healthRow.insertCell(4).innerText = lastMedicalCheckup;
                healthRow.insertCell(5).innerText = healthNotes;
                healthCount++;
            }
        }
        
        const personalNote = document.querySelector('.personal-table .table-note');
        const schoolNote = document.querySelector('.school-table .table-note');
        const healthNote = document.querySelector('.health-table .table-note');
        
        if (personalNote) personalNote.innerHTML = `* Total Records: ${personalCount}`;
        if (schoolNote) schoolNote.innerHTML = `* Total Records: ${schoolCount}`;
        if (healthNote) healthNote.innerHTML = `* Total Records: ${healthCount}`;
        
    } catch(error) {
        console.error('Error loading data:', error);
    }
}

// Load data when page loads
loadDataToTables();

// Auto-refresh every 10 seconds
setInterval(loadDataToTables, 10000);

// Refresh when form is submitted
const form = document.getElementById('mainForm');
if (form) {
    form.addEventListener('submit', function() {
        setTimeout(loadDataToTables, 2000);
    });
}

