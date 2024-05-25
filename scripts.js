document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('formResponse').classList.remove('hidden');
    document.getElementById('formResponse').classList.add('visible');
});
