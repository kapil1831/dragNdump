const show_entry_btn = document.getElementById('btn-entry');
const ques_txt_area = document.getElementById('div-ques');
const body = document.getElementsByTagName('body');


ques_txt_area.addEventListener('click', (e) => {
    e.preventDefault();
    var link_div = document.getElementById('div-link');
    var solution_div = document.getElementById('div-solution');
    if (link_div.style.display === 'none') link_div.style.display = 'block';
    if (solution_div.style.display === 'none') solution_div.style.display = 'block';
});



show_entry_btn.addEventListener('click', (e) => {
    e.preventDefault();
    var entries = document.getElementById('div-entries');
    if (entries.style.display === 'none') {
        entries.style.display = 'block';
    } else {
        entries.style.display = 'none';
    }
});


body.addEventListener('click', (e) => {
    e.preventDefault();
    var link_div = document.getElementById('div-link');
    var solution_div = document.getElementById('div-solution');
    if (link_div.style.display === 'block') link_div.style.display = 'none';
    if (solution_div.style.display === 'block') solution_div.style.display = 'none';
});
