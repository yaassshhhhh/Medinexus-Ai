

async function testVideo() {
    try {
        const response = await fetch('http://localhost:4000/api/chatbot/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: 'fever and headache' })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Success:', data);
        } else {
            console.log('Error status:', response.status);
            console.log('Error data:', data);
        }
    } catch (error) {
        console.log('Error:', error.message);
        if (error.cause) console.log('Cause:', error.cause);
    }
}

testVideo();

