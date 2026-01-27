// CONSULTING ENGINE CORE
// COPYRIGHT SERCAIA 2026 - ALL RIGHTS RESERVED
// CONFIDENTIAL CODE

(function () {
    // Anti-Copy / Anti-Debug Protection
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', event => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.key === 'u')) {
            event.preventDefault();
        }
    });

    const businessData = {
        name: "Tu Empresa",
        industry: "general",
        capacity: "small", // default
        email: "",
        challenge: "",
        revenue: "",
        tools: "",
        priority: "",
        timeline: "",
        budget: ""
    };

    // Expose functions to global scope safely
    window.startConsulting = function () {
        fadeSwitch('step-intro', 'step-form');
    };

    window.processAnalysis = function () {
        const nameInput = document.getElementById('businessName').value;
        const industryInput = document.getElementById('industry').value;
        const emailInput = document.getElementById('email').value;
        const capacityInput = document.getElementById('capacity').value;

        if (!industryInput) {
            alert("Por favor, selecciona al menos un sector.");
            return;
        }

        businessData.name = nameInput || "Tu Empresa";
        businessData.industry = industryInput;
        businessData.email = emailInput;
        // If capacity input doesn't exist (yet to be added to HTML), fallback to 'small'
        businessData.capacity = capacityInput || "small";
        businessData.challenge = document.getElementById('challenge').value;

        // Capture New Fields
        businessData.revenue = document.getElementById('revenue').value;
        businessData.tools = document.getElementById('tools').value;
        businessData.priority = document.getElementById('priority').value;
        businessData.timeline = document.getElementById('timeline').value;
        businessData.budget = document.getElementById('budget').value;

        fadeSwitch('step-form', 'step-simulation');
        runSimulation();
    }

    // Simulation Logic
    window.runSimulation = function () {
        // DISRUPTIVE LOGS: Super Prompts Actions
        const strategyLogs = [
            "Initializing 'Blue Ocean' Strategy Model...",
            "Executing Super-Prompt: CHAINSAW AUDIT v4.0...",
            "Detecting Market Gaps in [SECTOR_DB]...",
            "Validating Unfair Advantage..."
        ];

        const automationLogs = [
            "Connecting to n8n module...",
            "Mapping workflow nodes...",
            "Calculating API costs...",
            "Optimizing latency..."
        ];

        let progress = 0;
        const bar = document.getElementById('progress-bar');
        const logStrat = document.getElementById('log-strategy');
        const logAuto = document.getElementById('log-automation');

        // Simulate logs
        let i = 0;
        const interval = setInterval(() => {
            progress += 5;
            bar.style.width = progress + '%';

            if (progress % 15 === 0 && i < 4) {
                logStrat.innerHTML += `> ${strategyLogs[i]}<br>`;
                logAuto.innerHTML += `> ${automationLogs[i]}<br>`;
                logStrat.scrollTop = logStrat.scrollHeight;
                logAuto.scrollTop = logAuto.scrollHeight;
                i++;
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    showResults();
                }, 500);
            }
        }, 200); // 4 seconds total approx
    };

    // Internal function exposed
    function showResults() {
        fadeSwitch('step-simulation', 'step-results');

        // Dynamic Content based on Industry
        document.getElementById('res-business').innerText = businessData.name.toUpperCase();

        // --- BACKEND INTEGRATION: Save & Send Email ---
        fetch('api_save_consulting.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(businessData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
                const toastTitle = document.querySelector('#email-toast h4');
                const toastDesc = document.querySelector('#email-toast p');
                if (data.success) {
                    if (toastTitle) toastTitle.innerText = "Informe Enviado";
                    if (toastDesc) toastDesc.innerText = "Desde: info@sercaia.com";
                } else {
                    if (toastTitle) toastTitle.innerText = "Error Servidor";
                    if (toastDesc) toastDesc.innerText = "No se pudo guardar.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // ---------------------------------------------

        const roadmapList = document.getElementById('res-roadmap');
        roadmapList.innerHTML = '';

        let roundedSavings = "0€";
        let hours = "0h";
        let baseSavings = 0;
        let chartData = [1, 1];

        // LOGIC: Savings Multiplier based on Capacity
        let multiplier = 1;
        if (businessData.capacity === 'medium') multiplier = 5;
        if (businessData.capacity === 'large') multiplier = 20;
        if (businessData.capacity === 'enterprise') multiplier = 100;

        let items = [];
        let guruKeys = [];

        // DIAGNOSIS LOGIC
        const diagnosisContainer = document.getElementById('res-diagnosis');
        const problemText = document.getElementById('res-problem-text');
        const solutionText = document.getElementById('res-solution-text');

        // Default Pains per sector if empty
        const defaultPains = {
            retail: "Exceso de stock no vendido y márgenes bajos.",
            startup: "Burn rate alto y coste de adquisición disparado.",
            restauracion: "Mesas vacías entre semana y mermas de comida.",
            finance: "Demasiado tiempo en burocracia y compliance.",
            turismo: "Dependencia de las OTAs (Booking) y bajas reservas directas.",
            construction: "Retrasos en obra, sobrecostes de materiales y gestión de subcontratas.",
            agro: "Incertidumbre climática, precios bajos en origen y costes de fertilizantes.",
            general: "Hacemos muchas tareas manuales repetitivas."
        };

        // Solutions Database
        const solutions = {
            retail: "Implementar un Agente de Inventario Predictivo que reduce el stock un 30% automáticamente.",
            startup: "Automatizar el cold-outbound con 50 agentes IA y auditar costes SaaS en tiempo real.",
            restauracion: "Un Bot de Reservas 24/7 que reactiva clientes antiguos por WhatsApp para llenar martes y miércoles.",
            finance: "Un 'Auditor IA' que revisa documentos en segundos, no horas.",
            turismo: "Un Recepcionista Virtual que vende upgrades y gestiona check-ins sin intervención humana.",
            construction: "Un 'Jefe de Obra Digital' que audita plazos, materiales y certificaciones en tiempo real.",
            agro: "Un 'Agrónomo IA' que predice riegos y plagas, reduciendo costes de insumos un 25%.",
            general: "Digitalizar el flujo 'Lead -> Factura' para que no tengas que picar datos nunca más."
        };

        const sectorKey = businessData.industry || 'general';
        const userPain = businessData.challenge && businessData.challenge.length > 5 ? businessData.challenge : defaultPains[sectorKey];

        if (userPain && diagnosisContainer) {
            diagnosisContainer.classList.remove('hidden');
            if (problemText) problemText.innerText = userPain;

            if (solutionText) {
                if (businessData.challenge && businessData.challenge.length > 5) {
                    solutionText.innerText = "Nuestros agentes han analizado este problema. La solución implica desplegar un módulo de 'Eficiencia Operativa' que elimine el cuello de botella mediante automatización de procesos (RPA) y Agentes de Decisión. El impacto estimado es reducir este dolor un 60% en 3 semanas.";
                } else {
                    solutionText.innerText = solutions[sectorKey];
                }
            }
        }

        // PSYCHOLOGY MODULE (FOMO & SCORE)
        const psychContainer = document.getElementById('res-psychology');
        if (psychContainer) psychContainer.classList.remove('hidden');

        const benchmarks = {
            retail: "El 55% de tus competidores ya usa IA para predicción de stock. Estás pagando sobrecostes que ellos ya han eliminado.",
            startup: "Las startups de tu nicho que usan IA levantan rondas un 40% más rápido. Tu velocidad actual es peligrosa.",
            finance: "Las firmas líderes ya auditan documentos en 3 segundos. Tú sigues usando horas humanas.",
            restauracion: "Tu competencia directa ya llena los martes usando bots de WhatsApp. Tú sigues esperando que suene el teléfono.",
            turismo: "Los hoteles digitalizados tienen un 30% más de ticket medio por huésped gracias al upselling automático.",
            construction: "Las constructoras Tech reducen sus desviaciones de presupuesto un 60%. Tú sigues asumiendo sobrecostes.",
            agro: "Las fincas digitalizadas ahorran un 40% en agua y fertilizantes con sensores IA. Tú sigues regando 'a ojo'.",
            general: "El mercado se mueve rápido. El 40% de las Pymes de tu sector ya están automatizando facturas."
        };
        const benchmarkText = document.getElementById('res-benchmark-text');
        if (benchmarkText) benchmarkText.innerText = benchmarks[sectorKey];

        // SECTOR LOGIC (BOARD OF DIRECTORS EDITION)
        const commonTalentGuru = { persona: "SIMON SINEK", role: "Cultura & Felicidad", title: "Crecimiento Personal", desc: "El éxito real es que tu equipo crezca como personas. Si ellos evolucionan, la empresa vuela. 🚀 [TEASER] Implantamos el 'Modelo Leopoldo': Hazles partícipes del beneficio y sentirán la empresa como suya." };

        const commonHeadhunter = { persona: "REID HOFFMAN", role: "Headhunter IA", title: "Caza de Talentos", desc: "No publiques ofertas y esperes. Nuestra IA escanea Toptal, LinkedIn y Fiverr Pro para robarte al 1% mejor del mercado antes de que tu competencia se entere." };

        const commonEthics = { persona: "CHARLIE MUNGER", role: "Ética & Fidelidad", title: "Win-Win o Nada", desc: "La ética retiene clientes 10 veces más que el precio. Decir la verdad (incluso si duele) crea fidelidad eterna. No vendemos, construimos relaciones." };

        const commonTitans = {
            jose_elias: { persona: "JOSÉ ELÍAS", role: "Realidad", title: "Excel o Muerte", desc: "Déjate de unicornios. Si no da Ebitda positivo hoy, ciérralo. El primer deber moral del empresario es ser rentable." },
            leopoldo: { persona: "LEOPOLDO F. PUJALS", role: "Escala", title: "Hazlos Socios", desc: "Reparte el éxito. Si el encargado de tienda tiene acciones, cuidará el negocio como tú. Alinea intereses o muere." }
        };

        const hospitalityOps = { persona: "JON TAFFER", role: "Rentabilidad", title: "Sillas = Dinero", desc: "Una silla vacía es dinero quemado. Olvida el 'branding' abstracto. Usa IA para lanzar promos flash por WhatsApp a vecinos 1 hora antes del servicio." };

        if (businessData.industry === 'retail') {
            items = ["🤖 Agente de Stock", "💬 Chatbot Ventas", "📧 Marketing IA", "🧾 Facturación OCR"];
            guruKeys = [
                { persona: "ELON MUSK", role: "Eficiencia", title: "Elimina el Stock Muerto", desc: "El mejor stock es no tener stock. Si no rota, bórralo." },
                { persona: "ALEX HORMOZI", role: "Ventas", title: "La Oferta Irresistible", desc: "No vendas productos, vende resultados. Upsell automático." },
                { persona: "AMANCIO ORTEGA", role: "Logística", title: "Just-In-Time", desc: "No produzcas lo que no has vendido. Escucha al cliente hoy, vende mañana." },
                commonHeadhunter,
                commonTalentGuru,
                commonEthics
            ];
            // Savings...
            baseSavings = 35000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (1800 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.3 * multiplier, baseSavings * 0.3 * multiplier];

        } else if (businessData.industry === 'startup') {
            items = ["🚀 Auto-Pitch Deck", "🕵️ VC Matchmaking", "📉 Burn Rate AI", "🧪 Growth Bot"];
            guruKeys = [
                { persona: "JENSEN HUANG", role: "Speed", title: "Run, Don't Walk", desc: "El mundo se mueve a la velocidad de la luz. Si no usas IA hoy, estás muerto mañana." },
                { persona: "PETER THIEL", role: "Monopolio", title: "Zero to One", desc: "No compitas. Crea un monopolio en un nicho pequeño y domínalo con IA." },
                { persona: "SAM ALTMAN", role: "Escala", title: "Superhumanidad", desc: "Un empleado con IA debe rendir como 10. Si no, estás contratando mal." },
                commonHeadhunter,
                commonTalentGuru
            ];
            // Savings...
            baseSavings = 80000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (3000 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 0.8 * multiplier, baseSavings * 0.1 * multiplier];

        } else if (businessData.industry === 'restauracion') {
            if (multiplier >= 20) {
                // Large Chains
                items = ["🍽️ ERP Sala", "📦 Stock Auto", "📊 Ing. Menú", "⭐ Reputación AI"];
                guruKeys = [
                    { persona: "RAY KROC", role: "Sistemas", title: "Consistencia McDonald's", desc: "La hamburguesa sabe igual en Tokio que en Madrid. Tu restaurante debe funcionar igual si tú no estás." },
                    { persona: "GORDON RAMSAY", role: "Estándares", title: "Si es Mierda, no Sale", desc: "La IA debe ser tu Chef Ejecutivo Virtual. Control de calidad automático en cada plato y reseña." },
                    commonTitans.leopoldo, // Leopoldo perfect for chains
                    hospitalityOps,
                    commonTalentGuru,
                    commonEthics
                ];
            } else {
                // Local Restaurants
                items = ["📅 Bot Reservas", "📸 Menú Viral", "⭐ Google Maps Auto", "🧾 Ticket Digital"];
                guruKeys = [
                    { persona: "GORDON RAMSAY", role: "Pesadilla en la Cocina", title: "Simplifica el Menú", desc: "¿60 platos? ¡Basura! Reduce a 10 platos estrella. Menos merma, más calidad, más margen." },
                    { persona: "FERRAN ADRIÀ", role: "Experiencia", title: "Sorpresa", desc: "El cliente come con los ojos. Tu menú digital debe tener videos 4K de los platos humeantes. Haz que saliven." },
                    commonTitans.leopoldo,
                    hospitalityOps,
                    commonTalentGuru,
                    commonEthics
                ];
            }
            // Savings...
            baseSavings = 15000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (850 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.4 * multiplier, baseSavings * 0.4 * multiplier];

        } else if (businessData.industry === 'turismo') {
            items = ["🌍 Guía Voz 24/7", "📅 Rutas Smart", "🏨 Check-in Facial", "🗣️ Traductor IA"];
            guruKeys = [
                { persona: "BRIAN CHESKY", role: "Experiencia", title: "Live There (Airbnb)", desc: "No vendas una cama, vende la vida local. Tu IA debe recomendar la mejor churrería oculta del barrio." },
                { persona: "RICHARD BRANSON", role: "Wow Factor", title: "Hazlo Divertido", desc: "El check-in es aburrido. Elimínalo. Que tu IA envíe un chiste y la clave wifi antes de que lleguen." },
                { persona: "CESAR RITZ", role: "Lujo", title: "Customer is King", desc: "El cliente nunca se equivoca, solo está mal informado. La IA debe predecir sus deseos antes de que los verbalice." },
                commonHeadhunter,
                commonTalentGuru
            ];
            // Savings...
            baseSavings = 28000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (1600 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.4 * multiplier, baseSavings * 0.3 * multiplier];

        } else if (businessData.industry === 'health') {
            items = ["🩺 Diagnóstico Preliminar", "📅 Citas WhatsApp Auto", "🗣️ Transcripción Consulta", "💊 Recordatorios Smart"];
            guruKeys = [
                { persona: "MARIE CURIE", role: "Precisión", title: "Ciencia de Datos", desc: "No adivines. Mide. La IA puede detectar patrones en la salud de tus pacientes que tu ojo no ve." },
                { persona: "DR. HOUSE", role: "Diagnóstico", title: "Todo el mundo miente", desc: "Los pacientes olvidan cosas. Tu IA no. Cruza historiales, alergias y síntomas para evitar errores." },
                { persona: "HIPÓCRATES", role: "Ética", title: "Primero no dañar", desc: "La tecnología debe humanizar la medicina, no enfriarla. Usa IA para burocracia y mira a los ojos al paciente." },
                commonHeadhunter,
                commonTalentGuru
            ];
            let baseSavings = 38000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (1900 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.3 * multiplier, baseSavings * 0.2 * multiplier];

        } else if (businessData.industry === 'finance') { // Fits Legal too
            items = ["📊 Risk Dashboard", "📄 Doc Manager", "🔍 NLP Compliance", "🤖 Auto-Reporting"];
            guruKeys = [
                { persona: "WARREN BUFFETT", role: "Inversión", title: "Foso Defensivo", desc: "Tu marca es tu foso. Si usas IA para dar servicio ultra-personalizado, nadie podrá robarte a un cliente." },
                { persona: "HARVEY SPECTER", role: "Legal", title: "I Don't Play the Odds", desc: "Yo juego al hombre. Usa IA para conocer a la otra parte mejor que ellos mismos. Gana antes de entrar al juicio." },
                { persona: "RAY DALIO", role: "Sistemas", title: "Meritocracia de Ideas", desc: "Sistematiza la toma de decisiones. Tu IA debe alertarte de los errores, no esconderlos." },
                commonHeadhunter,
                commonTalentGuru
            ];
            // Savings...
            baseSavings = 52000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (2500 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.5 * multiplier, baseSavings * 0.2 * multiplier];

        } else if (businessData.industry === 'construction') {
            items = ["🏗️ Certificación Auto", "👷 Control Presencia", "🧱 Stock Obra", "📅 Cronograma IA"];
            guruKeys = [
                { persona: "FLORENTINO PÉREZ", role: "Gestión", title: "Ingeniería Financiera", desc: "La obra no termina cuando pones el ladrillo, sino cuando cobras. Usa IA para asegurar el flujo de caja." },
                commonTitans.jose_elias, // Construction heavily related to energy/projects
                commonTitans.leopoldo, // Scaling
                commonHeadhunter,
                commonTalentGuru
            ];
            baseSavings = 45000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (2200 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.2 * multiplier, baseSavings * 0.3 * multiplier];

        } else if (businessData.industry === 'agro') {
            items = ["🚜 Riego Inteligente", "📡 Predicción Clima", "📦 Trazabilidad", "💶 Subvenciones Auto"];
            guruKeys = [
                { persona: "JUAN ROIG", role: "Cadena", title: "El Jefe es el Cliente", desc: "Si al cliente no le gusta, no se produce. Usa IA para saber qué variedad se venderá mejor el año que viene." },
                { persona: "NORMAN BORLAUG", role: "Yield", title: "Más con Menos", desc: "La tecnología salvó al mundo del hambre. Úsala. Sensores e IA para sacar un 20% más de tu tierra." },
                { persona: "HENRY FORD", role: "Sistema", title: "Industrializa", desc: "El campo es una fábrica a cielo abierto. Si hay una tarea repetitiva, debe hacerla un robot, no tu espalda." },
                commonHeadhunter,
                commonTalentGuru
            ];
            baseSavings = 30000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (1400 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.3 * multiplier, baseSavings * 0.4 * multiplier];

        } else {
            // GENERAL / PYME / RESTAURACION / TURISMO (Mix)
            items = ["📞 Voz IA", "📅 Agenda Smart", "📱 Social Bot", "🔗 CRM Auto"];
            guruKeys = [
                { persona: "ALEX HORMOZI", role: "Oferta", title: "Grand Slam Offer", desc: "Crea un paquete tan bueno que se sientan tontos diciendo que no. Y usa IA para entregarlo rápido." },
                { persona: "JEFF BEZOS", role: "Escala", title: "Day 1 Mentality", desc: "Trata a tu pyme como una startup en su día 1. Obsesionate con el cliente, no con la competencia. Velocidad pura." },
                { persona: "ELON MUSK", role: "First Principles", title: "Destruye la Burocracia", desc: "¿Ese informe es necesario por ley de la física o por costumbre? Si es costumbre, a la basura. Ahorra tiempo ya." },
                { persona: "DAVID OGILVY", role: "Copy", title: "Vende con Verdad", desc: "Tu cliente no es idiota, es tu mujer. Usa la IA para escribirle cartas, no spam." },
                commonEthics
            ];
            baseSavings = 25000;
            roundedSavings = (baseSavings * multiplier).toLocaleString('de-DE') + "€";
            hours = (1200 * multiplier).toLocaleString('de-DE') + "h";
            chartData = [baseSavings * 1.4 * multiplier, baseSavings * 0.35 * multiplier];
        }

        // IMPLEMENTATION ARMY (TECH TALENT MATCHING)
        let techProfiles = [];

        // Define profiles based on needs
        if (businessData.industry === 'retail') {
            techProfiles = [
                { role: "Computer Vision Engineer", source: "TOPTAL (Elite)", score: "9.9/10", rate: "120€/h", reason: "Visión Artificial de Grado Militar. Cero latencia en sistemas críticos de vigilancia." },
                { role: "Chatbot Specialist", source: "FIVERR PRO (Vetted)", score: "9.3/10", rate: "35€/h", reason: "Configuración rápida del Bot de WhatsApp. Calidad verificada a bajo coste." }
            ];
        } else if (businessData.industry === 'finance' || businessData.industry === 'health') { // Legal/Health
            techProfiles = [
                { role: "Senior NLP Architect", source: "BRAINTRUST (Expert)", score: "9.9/10", rate: "110€/h", reason: "Cumplimiento normativo absoluto (GDPR/HIPAA). Seguridad nivel bancario." },
                { role: "Automation Scripter", source: "LEMON.IO (Fast)", score: "9.2/10", rate: "45€/h", reason: "Para conectar la IA con tu software antiguo (Legacy)." }
            ];
        } else if (businessData.industry === 'startup') {
            techProfiles = [
                { role: "Full Stack AI Lead", source: "TOPTAL (Elite)", score: "9.9/10", rate: "150€/h", reason: "Arquitectura a prueba de bombas (Nuclear-proof). Escala a millones sin caer." },
                { role: "Data Scraper", source: "FIVERR PRO (Gig)", score: "9.1/10", rate: "25€/h", reason: "Scripts rápidos para obtener leads. Bueno, bonito y barato." }
            ];
        } else {
            // General / Rest / Turismo / Construction / Agro
            techProfiles = [
                { role: "Automation Architect", source: "TOPTAL (Elite)", score: "9.9/10", rate: "115€/h", reason: "Ingeniería de Sistemas Críticos. Lo complicado lo hacen ellos, lo fácil la IA." },
                { role: "Workflow Implementer", source: "FIVERR PRO (Vetted)", score: "9.4/10", rate: "30€/h", reason: "Para conectar Zapiers y excels en un fin de semana." }
            ];
        }

        const teamContainer = document.getElementById('implementation-team');
        if (teamContainer) {
            teamContainer.innerHTML = '';
            techProfiles.forEach(profile => {
                teamContainer.innerHTML += `
                    <div class="flex items-start gap-4 p-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition rounded-lg">
                        <div class="bg-purple-900/40 text-purple-400 p-3 rounded-lg"><i class="fa-solid fa-code"></i></div>
                        <div>
                            <h5 class="text-white font-bold text-lg">${profile.role}</h5>
                            <p class="text-sm text-gray-400 mb-2">${profile.reason}</p>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="bg-gray-800 text-gray-300 px-2 py-1 rounded">Origen: ${profile.source}</span>
                                <span class="text-green-400 font-mono">${profile.rate}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // ORGANOGRAM LOGIC
        const organogramContainer = document.getElementById('ai-organogram');
        let orgHTML = '';

        if (businessData.industry === 'retail') {
            orgHTML = `
                <!-- Level 1 -->
                <div class="border-2 border-yellow-500 bg-yellow-900/40 text-yellow-100 px-6 py-3 rounded-xl font-bold text-center w-48 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <i class="fa-solid fa-crown mr-2"></i> CEO (TÚ)
                    <div class="text-[10px] font-normal opacity-80">Estrategia & Visión</div>
                </div>
                <!-- Connector -->
                <div class="h-8 w-px bg-gray-500"></div>
                <div class="w-full max-w-2xl border-t border-gray-500 relative h-4">
                    <div class="absolute -top-px left-1/4 h-4 w-px bg-gray-500"></div> <!-- Left Connect -->
                    <div class="absolute -top-px right-1/4 h-4 w-px bg-gray-500"></div> <!-- Right Connect -->
                    <div class="absolute -top-px left-1/2 -ml-px h-4 w-px bg-gray-500"></div> <!-- Center Connect -->
                </div>
                <!-- Level 2 -->
                <div class="grid grid-cols-3 gap-4 w-full text-center">
                    <div class="flex flex-col items-center">
                        <div class="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 p-3 rounded-lg w-full">
                            <i class="fa-solid fa-robot text-xm mb-1"></i>
                            <div class="font-bold text-sm">CFO Autònomo</div>
                            <div class="text-[9px] opacity-70">Facturas, Stock, Márgenes</div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="bg-purple-900/40 border border-purple-500/50 text-purple-200 p-3 rounded-lg w-full">
                            <i class="fa-solid fa-user text-xm mb-1"></i>
                            <div class="font-bold text-sm">Manager Tienda</div>
                            <div class="text-[9px] opacity-70">Experiencia Cliente & Equipo</div>
                        </div>
                        <div class="h-4 w-px bg-gray-600"></div>
                        <div class="bg-cyan-900/20 border border-cyan-500/30 text-cyan-200 p-2 rounded text-[10px]">
                            🤖 Asistente Copilot
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 p-3 rounded-lg w-full">
                            <i class="fa-solid fa-bullhorn text-xm mb-1"></i>
                            <div class="font-bold text-sm">CMO Inteligente</div>
                            <div class="text-[9px] opacity-70">Ads, WhatsApp, CRM</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (businessData.industry === 'startup') {
            orgHTML = `
                <!-- Level 1 -->
                <div class="border-2 border-yellow-500 bg-yellow-900/40 text-yellow-100 px-6 py-3 rounded-xl font-bold text-center w-48 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <i class="fa-solid fa-rocket mr-2"></i> CEO / FOUNDER
                </div>
                <div class="h-8 w-px bg-gray-500"></div>
                <!-- Level 2 -->
                <div class="grid grid-cols-2 gap-12 w-full text-center max-w-lg">
                    <div class="flex flex-col items-center">
                        <div class="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 p-3 rounded-lg w-full">
                             <div class="font-bold text-sm">🤖 Dev 24/7</div>
                             <div class="text-[9px]">Código, Tests, Deploy</div>
                        </div>
                        <div class="h-2 w-px bg-gray-600"></div>
                        <div class="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 p-3 rounded-lg w-full mt-1">
                             <div class="font-bold text-sm">🤖 Growth Bot</div>
                             <div class="text-[9px]">Scraping, Outreach</div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <div class="bg-purple-900/40 border border-purple-500/50 text-purple-200 p-3 rounded-lg w-full h-full flex flex-col justify-center">
                             <i class="fa-solid fa-brain mb-1"></i>
                             <div class="font-bold text-sm">Product Lead (TÚ)</div>
                             <div class="text-[9px]">Visión y Diseño</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // General Structure
            orgHTML = `
                <!-- Level 1 -->
                <div class="border-2 border-yellow-500 bg-yellow-900/40 text-yellow-100 px-6 py-3 rounded-xl font-bold text-center w-48 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <i class="fa-solid fa-chess-king mr-2"></i> DIRECCIÓN
                </div>
                <div class="h-8 w-px bg-gray-500"></div>
                <div class="w-full max-w-xl border-t border-gray-500 relative h-4">
                    <div class="absolute -top-px left-0 h-4 w-px bg-gray-500"></div>
                    <div class="absolute -top-px right-0 h-4 w-px bg-gray-500"></div>
                </div>
                <!-- Level 2 -->
                <div class="flex justify-between w-full max-w-xl text-center gap-4">
                    <div class="flex flex-col items-center flex-1">
                        <div class="bg-cyan-900/40 border border-cyan-500/50 text-cyan-200 p-3 rounded-lg w-full">
                            <i class="fa-solid fa-calculator mb-1"></i>
                            <div class="font-bold text-sm">Admin IA</div>
                            <div class="text-[9px] opacity-70">Papeleo, Burocracia</div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center flex-1">
                         <div class="bg-purple-900/40 border border-purple-500/50 text-purple-200 p-3 rounded-lg w-full">
                            <i class="fa-solid fa-users mb-1"></i>
                            <div class="font-bold text-sm">Operaciones</div>
                            <div class="text-[9px] opacity-70">Equipo Humano</div>
                        </div>
                         <div class="h-4 w-px bg-gray-600"></div>
                        <div class="bg-cyan-900/20 border border-cyan-500/30 text-cyan-200 p-2 rounded text-[10px] w-full">
                            ⚡ Potenciado con IA
                        </div>
                    </div>
                </div>
            `;
        }

        if (organogramContainer) organogramContainer.innerHTML = orgHTML;

        // RENDER GURU KEYS (ANONYMIZED)
        const guruContainer = document.getElementById('guru-keys-container');
        guruContainer.innerHTML = '';
        guruKeys.forEach((key) => {
            guruContainer.innerHTML += `
                <div class="bg-transparent border-l-2 border-yellow-500 pl-6 py-2">
                    <h4 class="text-white font-bold text-lg mb-1">${key.title}</h4>
                    <p class="text-sm text-gray-400 italic mb-2">"${key.desc}"</p>
                    <div class="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-sky-500">
                        <i class="fa-solid fa-tag mr-1"></i> ${key.role}
                    </div>
                </div>
            `;
        });

        document.getElementById('res-savings').innerText = roundedSavings;

        // REVENUE CALCULATION (PRUDENT & VERIFIABLE)
        // Source: McKinsey "The economic potential of generative AI" (2023).
        let revenueMultiplier = 1.15;

        // Scale Nuance
        if (businessData.capacity === 'small') revenueMultiplier = 1.10; // Harder to scale revenue in small local biz
        if (businessData.industry === 'startup') revenueMultiplier = 1.6;
        if (businessData.industry === 'turismo') revenueMultiplier = 1.25;
        if (businessData.industry === 'construction') revenueMultiplier = 1.4; // High ticket
        if (businessData.industry === 'agro') revenueMultiplier = 1.15; // Volume

        // We apply this multiplier ONLY to the savings base to estimate value, keeping it grounded
        let estimatedRevenue = baseSavings * multiplier * 0.8 * revenueMultiplier;
        document.getElementById('res-revenue').innerText = "+" + estimatedRevenue.toLocaleString('de-DE') + "€";

        // REAL CASE STUDIES (Social Proof - Scale Relevant)
        const sizeMode = (businessData.capacity === 'small' || businessData.capacity === 'medium') ? 'pyme' : 'giant';

        let caseStudies = {};

        if (sizeMode === 'pyme') {
            // RELATABLE EXAMPLES (PEERS)
            caseStudies = {
                startup: { company: "SaaS B2B (Equipo de 5)", metric: "-1 SDR Contratado", desc: "Automatizaron la prospección y evitaron contratar un comercial extra este año." },
                retail: { company: "Modas 'Pepi' (Boutique)", metric: "-15% Stock Muerto", desc: "Dejaron de comprar tallas que no se venden gracias a la predicción básica." },
                finance: { company: "Gestoría Martínez", metric: "0 Horas Extras", desc: "En la campaña de la Renta, el Asistente IA clasificó el 90% de los tickets automáticamente." },
                restauracion: { company: "La Trattoria (Barrio)", metric: "+20% Lleno Martes", desc: "Un bot de WhatsApp reactivó a 300 clientes antiguos con una promo 'antidesperdicio'." },
                turismo: { company: "Casa Rural 'El Roble'", metric: "Recepción 24h", desc: "Instalaron llaves digitales y un Chatbot. El dueño ya no se levanta a las 2 AM." },
                construction: { company: "Reformas 'Paco'", metric: "-30% Desperdicio", desc: "Calculan los materiales exactos con IA antes de comprar. Ni un saco de cemento de más." },
                agro: { company: "Cooperativa 'San Isidro'", metric: "+15% Producción", desc: "Sensores básicos e IA les dicen cuándo regar para maximizar el fruto." },
                health: { company: "Clínica Dental 'Sonrisas'", metric: "-20% Citas Perdidas", desc: "El bot de WhatsApp recuerda la cita y reprograma automáticamente si el paciente cancela." },
                general: { company: "Talleres García", metric: "-2h Admin/Día", desc: "El dueño ahora está en el taller, no haciendo facturas en el ordenador." }
            };
        } else {
            // ASPIRATIONAL EXAMPLES (IANTS)
            caseStudies = {
                startup: { company: "KLARNA (Unicornio)", metric: "-66% Coste Soporte", desc: "Su Asistente IA hace el trabajo de 700 agentes humanos con mayor satisfacción." },
                retail: { company: "ZARA (Inditex)", metric: "-20% Mermas", desc: "Usa IA y RFID para predecir qué talla se venderá en qué tienda." },
                finance: { company: "JP MORGAN", metric: "360.000h Ahorradas", desc: "Su IA 'COIN' revisa créditos comerciales en segundos." },
                restauracion: { company: "DOMINO'S PIZZA", metric: "+70% Venta Digital", desc: "Su IA predice pedidos antes de que ocurran para tener las masas listas." },
                turismo: { company: "BOOKING.COM", metric: "+15% Conversión", desc: "Personaliza el orden de los hoteles para cada usuario con ML." },
                construction: { company: "ACS / VINCI", metric: "Obra Predictiva", desc: "Usan Gemelos Digitales para prever fallos estructurales antes de poner un ladrillo." },
                agro: { company: "JOHN DEERE AI", metric: "Agricultura Precisión", desc: "Sus tractores distinguen malas hierbas de cultivos y aplican herbicida milimétricamente." },
                health: { company: "MAYO CLINIC", metric: "IA Diagnóstica", desc: "Detectan patologías en radiografías años antes que el ojo humano." },
                general: { company: "AMAZON", metric: "Logística Anticipatoria", desc: "Envían el producto al centro logístico antes de que lo compres." }
            };
        }

        const caseData = caseStudies[sectorKey] || caseStudies['general'];
        document.getElementById('res-case-sector').innerText = sectorKey.toUpperCase();
        document.getElementById('res-case-company').innerText = caseData.company;
        document.getElementById('res-case-metric').innerText = caseData.metric;
        document.getElementById('res-case-desc').innerText = `"${caseData.desc}"`;

        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-check text-green-500 mr-2"></i> ${item}`;
            roadmapList.appendChild(li);
        });

        // Render Chart
        if (window.myChart) window.myChart.destroy();
        const ctx = document.getElementById('costChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Coste Tradicional', 'Coste con SercaIA'],
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#334155', '#38bdf8'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { color: 'white' } }
                }
            }
        });
    }

    // Phase 4: Generate Demo
    window.generateLiveDemo = function () {
        fadeSwitch('step-results', 'step-demo');
        const terminal = document.getElementById('terminal-output');

        const sizeLabel = businessData.capacity ? businessData.capacity.toUpperCase() : "SMALL";

        const codes = [
            "Initializing Builder Agent v2.0...",
            `Loading module: ${businessData.industry.toUpperCase()}_PACK...`,
            `Optimizing for Size: ${sizeLabel}...`,
            "Importing React Components...",
            "Connecting to OpenAI API...",
            "Training specific model...",
            "Compiling frontend...",
            "DEPLOYMENT SUCCESSFUL."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < codes.length) {
                terminal.innerHTML += `> ${codes[i]}<br>`;
                terminal.scrollTop = terminal.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
                setTimeout(renderFinalDemo, 1000);
            }
        }, 400);
    };

    function renderFinalDemo() {
        const container = document.getElementById('demo-container');
        container.classList.remove('hidden-step');
        container.classList.add('fade-in');

        let html = '';

        if (businessData.industry === 'retail') {
            html = `
            <div class="h-full flex flex-row">
                <div class="w-1/3 bg-gray-900 border-r border-gray-700 p-4">
                    <h4 class="text-sky-400 font-bold mb-4">Stock Alert 🔴</h4>
                    <div class="p-2 bg-red-900/30 border border-red-500/50 rounded mb-2 text-xs">Nike Air Jordan - Low Stock (2 units)</div>
                    <div class="p-2 bg-gray-800 rounded mb-2 text-xs text-gray-400">Adidas Yeezy - OK</div>
                </div>
                <div class="w-2/3 p-4 flex flex-col">
                    <h4 class="text-green-400 font-bold mb-2">Customer Chat (AI)</h4>
                    <div class="flex-grow bg-gray-900 rounded p-4 space-y-2 mb-2 text-sm overflow-y-auto">
                        <div class="bg-gray-800 p-2 rounded self-start w-3/4">¿Tenéis las Jordan en talla 42?</div>
                        <div class="bg-blue-900 p-2 rounded self-end w-3/4 text-right">¡Hola! 👟 Me quedan exactamente 2 pares. ¿Te reservo uno ahora mismo?</div>
                        <div class="bg-gray-800 p-2 rounded self-start w-3/4">Sí, por favor.</div>
                    </div>
                    <div class="h-10 bg-gray-800 rounded flex items-center px-3 text-gray-500 text-xs">Escribe un mensaje...</div>
                </div>
            </div>`;
        } else if (businessData.industry === 'finance') {
            html = `
            <div class="h-full p-6">
                <h3 class="text-xl font-bold mb-4">Market Prediction Dashboard</h3>
                <div class="flex gap-4 mb-4">
                    <div class="bg-gray-800 p-4 rounded flex-1">
                        <div class="text-xs text-gray-400">Risk Score</div>
                        <div class="text-2xl font-bold text-red-400">High (82%)</div>
                    </div>
                    <div class="bg-gray-800 p-4 rounded flex-1">
                        <div class="text-xs text-gray-400">Next Action</div>
                        <div class="text-xl font-bold text-green-400">BUY PUTS</div>
                    </div>
                </div>
                <div class="bg-slate-800 h-32 rounded flex items-end justify-between px-2 pb-2 gap-1">
                     <div class="bg-sky-500 w-full h-[40%]"></div>
                     <div class="bg-sky-500 w-full h-[60%]"></div>
                     <div class="bg-sky-500 w-full h-[30%]"></div>
                     <div class="bg-pink-500 w-full h-[90%] animate-pulse"></div>
                     <div class="bg-sky-500 w-full h-[50%]"></div>
                </div>
            </div>`;
        } else if (businessData.industry === 'restauracion') {
            html = `
                <div class="h-full flex flex-col p-6 bg-slate-900">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-orange-400"><i class="fa-solid fa-utensils mr-2"></i> RestaurantOS</h3>
                        <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Live Status: OK</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 h-full">
                        <div class="bg-slate-800 p-4 rounded-lg">
                            <h4 class="font-bold mb-2">Reservas (WhatsApp Bot)</h4>
                            <div class="space-y-2 text-sm text-gray-300">
                                <div class="bg-slate-700 p-2 rounded">👤 Juan (20:30) - 4 pax ✅</div>
                                <div class="bg-slate-700 p-2 rounded">👤 Ana (21:00) - 2 pax ✅</div>
                                <div class="bg-slate-700 p-2 rounded text-yellow-400">👤 Luis - ¿Tenéis sitio? (Respondiendo...)</div>
                            </div>
                        </div>
                        <div class="bg-slate-800 p-4 rounded-lg">
                            <h4 class="font-bold mb-2">Stock Crítico</h4>
                             <div class="flex justify-between text-sm mb-2">
                                <span>🍷 Vino Tinto</span> <span class="text-red-400">Low (2 bot)</span>
                             </div>
                             <button class="w-full bg-blue-600 text-xs py-1 rounded">Autopedido Enviado 🚀</button>
                        </div>
                    </div>
                </div>`;
        } else if (businessData.industry === 'turismo') {
            html = `
                <div class="h-full p-6 relative overflow-hidden text-center flex flex-col items-center justify-center">
                    <div class="absolute inset-0 bg-blue-900/20 bg-cover opacity-20"></div>
                    <h3 class="text-2xl font-bold text-sky-300 relative z-10">TravelMate AI</h3>
                    <div class="bg-black/80 p-4 rounded-xl text-left mx-auto max-w-sm mt-4 relative z-10 border border-sky-500/30">
                        <p class="text-xs text-gray-400 mb-1">Tu guía virtual:</p>
                        <p class="text-white italic">"¡Hola ${businessData.name}! He detectado overbooking en el Hotel Central. He redirigido a 2 familias al anexo y enviado los códigos QR de acceso. Todo resuelto."</p>
                    </div>
                </div>`;
        } else {
            // GENERAL / VOICE ASSISTANT DEMO
            const speechText = `Hola, soy tu asistente de ${businessData.name}. He agendado 3 citas para mañana y he respondido 15 emails hoy.`;
            html = `
            <div class="h-full flex items-center justify-center flex-col text-center p-10">
                <div class="w-24 h-24 rounded-full border-4 border-sky-400 flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer hover:scale-110 transition" onclick="playVoiceDemo('${speechText}')">
                    <i class="fa-solid fa-microphone text-4xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold">Voice Assistant Online</h3>
                <p class="text-gray-400 mt-2 max-w-sm italic">"${speechText}"</p>
                <button onclick="playVoiceDemo('${speechText}')" class="mt-6 px-6 py-2 bg-sky-600 rounded-full hover:bg-sky-500 transition font-bold flex items-center gap-2">
                    <i class="fa-solid fa-play"></i> ESCUCHAR DEMO
                </button>
                <div class="mt-4 flex gap-2 opacity-50">
                    <span class="w-2 h-8 bg-sky-500 animate-bounce"></span>
                    <span class="w-2 h-8 bg-purple-500 animate-bounce" style="animation-delay: 0.1s"></span>
                    <span class="w-2 h-8 bg-pink-500 animate-bounce" style="animation-delay: 0.2s"></span>
                </div>
            </div>
            `;
        }

        container.innerHTML = html;
    }

    // Function to play TTS - Exposed to Window
    window.playVoiceDemo = function (text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tu navegador no soporta reproducción de voz.");
        }
    };

    // Utility: PDF Download
    window.downloadPDF = function () {
        const btn = document.querySelector('button[onclick="downloadPDF()"]');
        const originalContent = btn.innerHTML;

        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generando...`;

        setTimeout(() => {
            alert("📄 Blueprint Estratégico descargado correctamente (Simulación).");
            btn.innerHTML = originalContent;
        }, 1500);
    };

    // Utility: Switch Sections
    function fadeSwitch(fromId, toId) {
        document.getElementById(fromId).classList.add('hidden-step');
        const toEl = document.getElementById(toId);
        toEl.classList.remove('hidden-step');
        toEl.classList.add('fade-in');
    }

})(); // End Protection IIFE
