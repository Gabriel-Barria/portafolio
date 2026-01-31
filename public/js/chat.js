// ===================================
// Chat Widget Premium
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeChatWidget();
    initializeContactRobot();
});

// ===================================
// Robot de Contacto
// ===================================
function initializeContactRobot() {
    const dataOption = document.getElementById('contactDataOption');
    const chatOption = document.getElementById('contactChatOption');
    const dataPanel = document.getElementById('contactDataPanel');
    const dataPanelClose = document.getElementById('contactDataClose');
    const chatWidget = document.getElementById('chatWidget');

    if (!dataOption || !chatOption) return;

    // Click en "Ver Datos de Contacto"
    dataOption.addEventListener('click', () => {
        if (dataPanel) {
            dataPanel.classList.toggle('visible');
            if (dataPanel.classList.contains('visible')) {
                setTimeout(() => {
                    dataPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    });

    // Cerrar panel de datos
    if (dataPanelClose) {
        dataPanelClose.addEventListener('click', () => {
            dataPanel.classList.remove('visible');
        });
    }

    // Click en "Chat en Vivo"
    chatOption.addEventListener('click', () => {
        if (chatWidget && typeof window.openChatWidget === 'function') {
            window.openChatWidget();
        }
    });
}

function initializeChatWidget() {
    const widget = document.getElementById('chatWidget');
    const fab = document.getElementById('chatFab');
    const closeBtn = document.getElementById('chatClose');
    const messagesContainer = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const typingIndicator = document.getElementById('chatTyping');
    const quickRepliesContainer = document.getElementById('chatQuickReplies');

    if (!widget) return;

    // Estado del chat
    let isOpen = false;
    let hasGreeted = false;

    // Respuestas automáticas simuladas
    const autoResponses = [
        "¡Gracias por tu mensaje! Te responderé lo antes posible.",
        "Interesante pregunta. Déjame revisar y te contesto pronto.",
        "¡Perfecto! He tomado nota de tu mensaje.",
        "Gracias por contactarme. Normalmente respondo en menos de 24 horas."
    ];

    // Quick replies
    const quickReplies = [
        { text: "Ver proyectos", action: () => window.location.href = '#projects' },
        { text: "Contactar", action: () => window.location.href = '#contact' },
        { text: "Sobre mí", action: () => window.location.href = '#about' }
    ];

    // Abrir chat
    function openChat() {
        if (isOpen) return;
        isOpen = true;
        widget.classList.add('open');

        // Activar FAB para que quede visible después de cerrar
        if (!widget.classList.contains('fab-activated')) {
            widget.classList.add('fab-activated');
            // Mover botón Back to Top a la izquierda
            document.body.classList.add('chat-active');
        }

        if (!hasGreeted) {
            showGreeting();
            hasGreeted = true;
        }

        setTimeout(() => input?.focus(), 300);
    }

    // Cerrar chat
    function closeChat() {
        isOpen = false;
        widget.classList.remove('open');
    }

    // Toggle chat
    function toggleChat() {
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    // Exponer función para abrir chat globalmente
    window.openChatWidget = openChat;

    // Mostrar saludo inicial
    function showGreeting() {
        const greetings = [
            { text: "¡Hola! 👋", delay: 500 },
            { text: "Soy Gabriel, ¿en qué puedo ayudarte?", delay: 1500 }
        ];

        greetings.forEach(({ text, delay }) => {
            setTimeout(() => {
                addMessage(text, 'received');
            }, delay);
        });

        // Mostrar quick replies después del saludo
        setTimeout(() => {
            showQuickReplies();
        }, 2000);
    }

    // Agregar mensaje
    function addMessage(text, type) {
        const message = document.createElement('div');
        message.className = `chat-message ${type}`;

        const now = new Date();
        const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        message.innerHTML = `
            <p>${escapeHtml(text)}</p>
            <span class="chat-time">${time}</span>
        `;

        messagesContainer.appendChild(message);
        scrollToBottom();

        // Ocultar quick replies después de enviar mensaje
        if (type === 'sent' && quickRepliesContainer) {
            quickRepliesContainer.style.display = 'none';
        }
    }

    // Mostrar quick replies
    function showQuickReplies() {
        if (!quickRepliesContainer) return;

        quickRepliesContainer.innerHTML = '';
        quickRepliesContainer.style.display = 'flex';

        quickReplies.forEach(({ text, action }) => {
            const btn = document.createElement('button');
            btn.className = 'chat-quick-reply';
            btn.textContent = text;
            btn.addEventListener('click', () => {
                addMessage(text, 'sent');
                quickRepliesContainer.style.display = 'none';

                // Simular respuesta
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    if (action) action();
                }, 1000);
            });
            quickRepliesContainer.appendChild(btn);
        });
    }

    // Mostrar indicador de escritura
    function showTyping() {
        if (typingIndicator) {
            typingIndicator.classList.add('visible');
            scrollToBottom();
        }
    }

    // Ocultar indicador de escritura
    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.classList.remove('visible');
        }
    }

    // Enviar mensaje
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'sent');
        input.value = '';

        // Simular respuesta
        showTyping();
        const delay = 1000 + Math.random() * 1500;

        setTimeout(() => {
            hideTyping();
            const response = autoResponses[Math.floor(Math.random() * autoResponses.length)];
            addMessage(response, 'received');
        }, delay);
    }

    // Scroll al final
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Escapar HTML para prevenir XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    if (fab) {
        fab.addEventListener('click', toggleChat);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Cerrar chat con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeChat();
        }
    });

    // Cerrar chat al hacer click fuera (excepto si viene del robot de contacto)
    document.addEventListener('click', (e) => {
        const contactChatOption = document.getElementById('contactChatOption');
        if (isOpen && !widget.contains(e.target) && !contactChatOption?.contains(e.target)) {
            closeChat();
        }
    });
}
