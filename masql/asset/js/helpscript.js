document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Terima kasih! Pesan Anda telah terkirim.";
                status.style.color = 'green';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! Terjadi masalah saat mengirim pesan.";
                }
                status.style.color = 'red';
            }
        } catch (error) {
            status.innerHTML = "Oops! Terjadi masalah saat mengirim pesan.";
            status.style.color = 'red';
        }
    }

    form.addEventListener("submit", handleSubmit);
});