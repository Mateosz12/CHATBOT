function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
}

function selectOption(option) {
    const optionsContainer = document.getElementById('mensabot');

    // Create user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.innerHTML = `<p>${option}</p>`;
    optionsContainer.appendChild(userMessage);

    // Create bot's response
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');
    let botResponse = '';

    switch (option) {
        case 'Duplicar planillas':
            botResponse = 'Has seleccionado duplicar planillas. Por favor, proporciona los detalles de la planilla que deseas duplicar.';
            break;
        case 'Consultar estado de la planilla':
            botResponse = 'Has seleccionado consultar estado de la planilla. Proporcióname el ID de la planilla.';
            break;
        case 'Preguntas a asistente virtual':
            botResponse = 'Has seleccionado hacer preguntas a asistente virtual. ¿Qué te gustaría saber?';
            break;
        case 'Enrutar a asesor':
                botResponse = 'Has seleccionado enrutar a asesor. Por favor, espera mientras te conecto con un asesor disponible.';
                break;
        case 'Crear planilla':
            botResponse = 'Has seleccionado crear planilla. Por favor, responde las siguientes preguntas.';
            askCreatePlanilla();
            return; // Exit to avoid appending botResponse immediately
        case 'Descargar comprobante':
            botResponse = 'Has seleccionado descargar comprobante. Proporcióname el número de planilla.';
            askDownloadComprobante();
            return; // Exit to avoid appending botResponse immediately
        default:
            botResponse = 'Opción no válida.';
    }

    botMessage.innerHTML = `<p>${botResponse}</p>`;
    optionsContainer.appendChild(botMessage);

    // Scroll to the bottom of the options container
    optionsContainer.scrollTop = optionsContainer.scrollHeight;
}

function askCreatePlanilla() {
    const optionsContainer = document.getElementById('mensabot');
    const questions = [
        '1. Nombre Completo',
        '2. Salario',
        '3. Selecciona novedad',
        'Gracias en un momento tendrás tu planilla'
    ];
    let currentQuestionIndex = 0;

    function askNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot');
            botMessage.innerHTML = `<p>${questions[currentQuestionIndex]}</p>`;
            optionsContainer.appendChild(botMessage);
            optionsContainer.scrollTop = optionsContainer.scrollHeight;
            currentQuestionIndex++;
        }
    }

    document.getElementById('user-input').addEventListener('keypress', function handleCreatePlanilla(event) {
        if (event.key === 'Enter') {
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            userMessage.innerHTML = `<p>${event.target.value}</p>`;
            optionsContainer.appendChild(userMessage);
            event.target.value = '';

            if (currentQuestionIndex < questions.length) {
                askNextQuestion();
            } else {
                document.getElementById('user-input').removeEventListener('keypress', handleCreatePlanilla);
            }
        }
    });

    askNextQuestion();
}

function askDownloadComprobante() {
    const optionsContainer = document.getElementById('mensabot');

    function askForPlanillaNumber() {
        const botMessage = document.createElement('div');
        botMessage.classList.add('chat-message', 'bot');
        botMessage.innerHTML = '<p>Por favor, proporciona el número de planilla.</p>';
        optionsContainer.appendChild(botMessage);
        optionsContainer.scrollTop = optionsContainer.scrollHeight;
    }

    document.getElementById('user-input').addEventListener('keypress', function handleDownloadComprobante(event) {
        if (event.key === 'Enter') {
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            userMessage.innerHTML = `<p>${event.target.value}</p>`;
            optionsContainer.appendChild(userMessage);

            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot');
            botMessage.innerHTML = `<p>Aquí está tu comprobante: <a href="https://example.com/comprobante_${event.target.value}.pdf" target="_blank">Descargar PDF</a></p>`;
            optionsContainer.appendChild(botMessage);
            optionsContainer.scrollTop = optionsContainer.scrollHeight;
            event.target.value = '';
            document.getElementById('user-input').removeEventListener('keypress', handleDownloadComprobante);
        }
    });

    askForPlanillaNumber();
}

function submitQuestion() {
    const inputElement = document.getElementById('user-input');
    const question = inputElement.value.trim();
    const optionsContainer = document.getElementById('mensabot');

    if (question === '') {
        return;
    }

    // Create user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.innerHTML = `<p>${question}</p>`;
    optionsContainer.appendChild(userMessage);

    // Create bot's response
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');

    let botResponse;
    if (!isNaN(question)) {
        botResponse = `Número de planilla: "${question}". Estamos procesando tu solicitud.`;
    } else {
        botResponse = `Tu pregunta: "${question}". Estamos procesando tu solicitud.`;
    }

    botMessage.innerHTML = `<p>${botResponse}</p>`;
    optionsContainer.appendChild(botMessage);

    // Scroll to the bottom of the options container
    optionsContainer.scrollTop = optionsContainer.scrollHeight;

    // Clear the input field
    inputElement.value = '';
}
