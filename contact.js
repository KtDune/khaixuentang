document.getElementById('gmail-btn').addEventListener('click', function (event) {
    event.preventDefault(); // prevent the link from opening mail app

    const email = 'khaixuen.tang@.com';
    navigator.clipboard.writeText(email)
        .then(() => {
            alert('Email copied to clipboard!\nSend an email to say hi!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
});