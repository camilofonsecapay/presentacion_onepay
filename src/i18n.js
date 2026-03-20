import { createContext, useContext } from 'react';

export const LangCtx = createContext('es');

export const useLang = () => useContext(LangCtx);

export const i18n = {
  es: {
    /* ─── Nav ─── */
    nav: {
      recaudo: "Recaudo Inteligente",
      pciLabel: "PCI DSS L1",
    },

    /* ─── Hero ─── */
    hero: {
      tag: "ISPs",
      h1: ["Tus usuarios te pagan en ", "5 días", ", no en 25."],
      sub: "OnePay cobra por WhatsApp, concilia en tiempo real y te muestra cuánta plata te va a entrar esta semana.",
      stats: [
        { v: 100, s: "+", l: "ISPs activas", sb: "con recaudo inteligente" },
        { v: 5.8, s: "d", l: "Días promedio", sb: "vs. 18 del mercado", d: 1 },
        { v: 93, s: "%", l: "Pagos exitosos", sb: "sin fricción" },
        { v: 15, s: "s", l: "Para pagar", sb: "4 clicks", p: "~" },
      ],
      marqueeCorpLabel: "Corporativos que confían en Onepay",
      marqueeISPLabel: "ISPs que confían en OnePay",
    },

    /* ─── Problema ─── */
    problema: {
      tag: "El problema",
      h2: "Entre facturar y recaudar hay una brecha.\nEsa brecha es plata que ya ganaste.",
      sub: "Los pagos llegan tarde, el corte es la única herramienta, y tu equipo persigue pagos en vez de crecer el ingreso por usuario.",
      cards: [
        {
          t: "Lado empresa",
          its: [
            ["25-35%", "cartera vencida >30 días"],
            ["2-3", "personas dedicadas a cobrar"],
            ["$8-12M", "COP/mes en cobranza"],
            ["Día 18", "promedio para recibir pago"],
            ["500+", "llamadas manuales al mes"],
          ],
          q: "\u201CLa plata ya se facturó pero no llega. Y el único recurso es el corte.\u201D",
        },
        {
          t: "Lado usuario",
          its: [
            ["40%", "abandono en PSE"],
            ["17", "pasos para pagar por PSE"],
            ["20%", "apertura emails de cobro"],
            ["0", "apps quiere descargar"],
            ["3+", "intentos para pagar"],
          ],
          q: "\u201CDoña Carmen no es morosa \u2014 pagar es difícil.\u201D",
        },
      ],
    },

    /* ─── Insight ─── */
    insight: {
      tag: "El insight",
      h2: ["Para cobrar hay que resolver", "cómo paga la gente"],
      sub: "La industria optimiza el cobro. Nadie optimiza el pago. OnePay hace las dos.",
      questions: [
        { q: "\u00BFCon qué pagar?", w: "Pasarelas", d: "Visa, MC, Nequi, Daviplata, PSE, Bre-B" },
        { q: "\u00BFCómo pagar?", w: "Checkouts", d: "4 clicks, sin fricción, sin apps" },
        { q: "\u00BFDónde pagar?", w: "OnePay", d: "WhatsApp \u2014 donde ya está el 98%" },
        { q: "\u00BFCómo hacer que pague?", w: "OnePay", d: "Behavioral intelligence + timing" },
      ],
      questionLabel: "Pregunta",
    },

    /* ─── Producto ─── */
    producto: {
      tag: "La experiencia",
      h2: "De la factura al dinero en tu cuenta",
      sub: "Tres canales, una plataforma. El usuario elige. Tú no tocas nada.",
      tabs: ["WhatsApp", "Portal", "Llamada IA"],
      tabTitles: ["Pago por WhatsApp", "Portal de Pagos", "Llamada con IA"],
      tabDescriptions: [
        "El usuario recibe su factura en WhatsApp. Toca \u201CIniciar pago\u201D y se abre un WhatsApp Flow nativo \u2014 sin salir de la app. Elige método, paga, listo.",
        "Portal web donde el usuario consulta su deuda por referencia, selecciona las facturas que quiere pagar y completa el pago en un solo lugar.",
        "Para cartera vencida. Cada empresa crea su propio agente de voz IA que llama como si fuera parte de su equipo. Contextualiza la deuda, maneja objeciones y envía link de pago por WhatsApp.",
      ],
      tabCtas: [
        "Haz click en \u201CIniciar pago\u201D para ver el WhatsApp Flow",
        "Haz click en \u201CConsultar\u201D para ver el flujo completo",
        "Mira la conversación desarrollarse en tiempo real",
      ],
      checks: {
        0: [
          "WhatsApp Flows nativo \u2014 sin salir de la app",
          "98% apertura vs 20% email",
          "~15 segundos para completar",
          "Todos los métodos de pago",
          "Recordatorios por comportamiento",
        ],
        1: [
          "Consulta por referencia de pago",
          "Selecciona una, varias o todas las deudas",
          "Múltiples métodos de pago",
          "Historial completo sin contraseña",
        ],
        2: [
          "Gestión de cartera vencida",
          "Cada empresa crea su propio agente IA",
          "Voz natural \u2014 indistinguible de una persona",
          "Manejo de objeciones en tiempo real",
          "Envía link de pago durante la llamada",
          "Parámetros de entrenamiento automáticos",
        ],
      },
      /* WhatsApp mockup text */
      wa: {
        cobroPdf: "Cobro.pdf",
        cobroSize: "912 KB \u00B7 pdf",
        cobroMsg: ["\u{1F44B} ", "OnePay", " ha solicitado ", "$85.000", " para el pago de tu ", "Factura Internet - Marzo", "."],
        cobroSafe: "Pagos seguros con OnePay",
        iniciarPago: "Iniciar pago",
        confirmMsg: ["Tu pago de ", "Factura Internet - Marzo", " ha sido acreditado exitosamente \u2705"],
        confirmReceipt: ["\u{1F3E6} ", "OnePay", " ha recibido el dinero satisfactoriamente."],
        confirmThanks: "\u00A1Gracias! \u2B50",
        documento: "Documento",
      },
      /* WhatsApp Flow overlay */
      flow: {
        cancel: "Cancel",
        page1Title: "Detalle de tu pago",
        page2Title: "Tus método de pago",
        page3Title: "Completado",
        bannerLine1: "Paga en ",
        bannerLine1b: "segundos",
        bannerLine1c: " sin",
        bannerLine2: "preocupaciones",
        bannerCredit: "Creado por ",
        bannerCreditBold: "onepay",
        labelTitulo: "Título",
        valueTitulo: "Factura Internet - Marzo",
        labelTotal: "Total",
        termsText: ["Al hacer clic en \u2018Iniciar pago\u2019, acepta los ", "términos y condiciones"],
        selectAccountText: "Selecciona una de tus cuentas o tarjetas inscritas",
        safePay: "Pagos seguros con OnePay",
        txInProgress: "Transacción en progreso",
        txUsed: "Has utilizado tu cuenta {method} como método de pago.",
        txProcess: "Esta transacción se procesará inmediatamente.",
        txThanks: "Gracias por usar OnePay.",
        btnPay: "Iniciar pago",
        btnContinue: "Continuar",
        btnFinish: "Finalizar",
        managedBy: "Managed by OnePay.",
        learnMore: "Learn more",
      },
      /* Payment methods (WhatsApp) */
      payMethods: [
        { icon: "\u{1F4B3}", name: "Visa \u00B70193", sub: "Los pagos con tarjeta se aprueban inmediatamente." },
        { icon: "\u{1F3E6}", name: "PSE Bancolombia", sub: "Pagaste previamente con este método." },
        { icon: "\u{1F4F1}", name: "Nequi \u00B76819", sub: "Los pagos se aprueban inmediatamente." },
        { icon: "\u{1F4F1}", name: "Daviplata", sub: "Billetera digital" },
      ],
      /* Portal mockup text */
      portal: {
        back: "\u2190 Volver",
        consultaH: "Consulta y paga en segundos",
        consultaSub: "Ingresa la referencia de pago",
        placeholder: "Ej: ABCD1234",
        errorField: "\u26A0\uFE0F Por favor completa este campo.",
        btnConsultar: "Consultar",
        tuConsulta: "Tu consulta",
        selectDeudas: "Selecciona las deudas que deseas pagar.",
        valorPagar: "Valor a pagar:",
        refLabel: "Ref. ",
        creacionLabel: "Creación: ",
        venceLabel: " | Vence: ",
        totalSeleccionado: "Total seleccionado",
        btnPagar: "Pagar",
        totalAPagar: "Total a pagar",
        pagoDe: "Pago de {n} deudas",
        metodoPago: "Método de pago",
        portalPayMethods: [
          { name: "Mastercard \u00B78594", sub: "Cargo extra de 3.15%" },
          { name: "Visa \u00B72029", sub: "Cargo extra de 3.15%" },
          { name: "Nequi \u00B76819", sub: "Sin cargo extra" },
          { name: "PSE", sub: "Sin cargo extra" },
        ],
        pagoExitoso: "Pago exitoso",
        conciliadoAuto: "\u2713 Conciliado automáticamente",
        footerSafe: "Pagos seguros con ",
        footerLang: "Español",
      },
      /* Deudas data labels */
      deudas: [
        { desc: "Internet Hogar 100Mbps - Febrero", ref: "FAC-2026-0218", fCreacion: "18 feb 2026", fVence: "5 mar 2026" },
        { desc: "Internet Hogar 100Mbps - Marzo", ref: "FAC-2026-0305", fCreacion: "5 mar 2026", fVence: "20 mar 2026" },
        { desc: "Cargo reconexión", ref: "", fCreacion: "1 mar 2026", fVence: "15 mar 2026" },
        { desc: "Upgrade velocidad Dic", ref: "FAC-2025-1201", fCreacion: "1 dic 2025", fVence: "20 dic 2025" },
      ],
      /* AI Call */
      call: {
        agenteIA: "Agente IA",
        gestionCartera: "Gestión de cartera",
        transcripcion: "\u{1F4AC} Transcripción en tiempo real",
        resumenIA: "\u{1F916} Resumen IA",
        resumenText: "El usuario aceptó recibir link de pago por WhatsApp. Pagará parcialmente hoy ($42.500) y el saldo cuando pueda. Sentimiento: cooperativo después de objeciones por liquidez. Método preferido: Nequi.",
        parametrosLabel: "\u{1F9E0} Parámetros aprendidos",
        parametros: [
          { k: "Objeción principal", v: "Falta de liquidez" },
          { k: "Detonante", v: "Pago parcial" },
          { k: "Canal preferido", v: "WhatsApp + Nequi" },
          { k: "Horario", v: "Tarde (1er intento)" },
          { k: "Tono efectivo", v: "Empático, sin presión" },
        ],
        lines: [
          { who: "ai", text: "Hola, buenas tardes. Soy Ana, de FibraNet. \u00BFHablo con el señor Carlos Martínez?" },
          { who: "user", text: "Sí, con él. \u00BFQué necesita?" },
          { who: "ai", text: "Don Carlos, lo llamo porque tiene una factura de $85.000 de su plan de Internet Hogar que está vencida desde el 18 de febrero. Queríamos ayudarle a ponerse al día antes de que se genere algún inconveniente con el servicio." },
          { who: "user", text: "Ay sí, ya sé... es que este mes ha estado muy duro. La verdad no he podido pagar." },
          { who: "ai", text: "Lo entiendo, don Carlos, y por eso lo llamo. \u00BFSabía que puede hacer un abono parcial para evitar el corte? Así no pierde la conexión y completa el resto cuando pueda." },
          { who: "user", text: "\u00BFY cuánto sería lo mínimo? Porque de verdad ando muy justo..." },
          { who: "ai", text: "Con que abone al menos la mitad, que serían $42.500, ya le cubriría para que no le corten. Y lo más fácil es que le mando un link a su WhatsApp ahora mismo y paga desde ahí, sin filas ni nada." },
          { who: "user", text: "\u00BFPero me queda debiendo el resto? \u00BFNo me van a cobrar más?" },
          { who: "ai", text: "No señor, el saldo queda registrado y lo puede pagar cuando quiera. No se genera ningún cobro adicional. \u00BFLe envío el link entonces?" },
          { who: "user", text: "Bueno, mándelo. Voy a ver si pago ahorita por Nequi." },
          { who: "ai", text: "Perfecto don Carlos, ya le envié el link al WhatsApp. Ahí puede elegir Nequi o el medio que prefiera. Cualquier cosa me puede escribir por ahí mismo. \u00A1Que esté muy bien!" },
        ],
      },
    },

    /* ─── Timeline ─── */
    timeline: {
      tag: "Cómo funciona",
      h2: "Recaudo en piloto automático",
      sub: "Secuencias inteligentes que se adaptan al comportamiento de cada pagador.",
      steps: [
        { lb: "Día facturación", tt: "Creación automática de cobros", dt: "Tu sistema de gestión genera la factura \u2192 OnePay la recibe al instante vía API. Se crean links de pago únicos y se prepara la secuencia de cobro personalizada." },
        { lb: "Cobro inicial", tt: "WhatsApp + Email + Portal", dt: "El usuario recibe su factura por WhatsApp con link directo (98% apertura). Simultáneamente email y portal. Botón de pago en un click." },
        { lb: "Día 3", tt: "Recordatorio inteligente", dt: "Solo a quienes no han pagado. El sistema analiza hora, día y canal donde cada usuario tiene mayor probabilidad de responder." },
        { lb: "Día 6-9", tt: "Escalamiento adaptativo", dt: "Behavioral intelligence cambia canal, hora y mensaje automáticamente. Si no abrió WhatsApp \u2192 email. Cada interacción mejora el siguiente intento." },
        { lb: "Día 12-15", tt: "Llamada con IA", dt: "Agente de voz IA para quienes no respondieron a digital. Voz natural, contexto de factura, envía link durante la llamada." },
        { lb: "Pago exitoso", tt: "Conciliación instantánea", dt: "El pago se aplica automáticamente en tu sistema de gestión. Sin reconciliar manualmente. Dashboard predice el flujo de la semana." },
      ],
      callout: ["61.3% de los pagos se completan en las primeras ", "53 horas"],
    },

    /* ─── Data ─── */
    data: {
      tag: "Datos reales \u00B7 Febrero 2026",
      h2: ["OnePay cobra más rápido.", "Los números lo prueban."],
      sub: "255.487 facturas procesadas. Comparamos velocidad de cobro OnePay vs. canales tradicionales.",
      metricLabels: ["Facturas procesadas", "Días promedio", "Cobrado en <5 días"],
      metricSubs: ["febrero 2026"],
      chartTitle: "% facturas cobradas acumulado",
      toggles: [
        { k: "top", l: "Top Performers" },
        { k: "avg", l: "Promedio" },
      ],
      sets: {
        top: {
          label: "Top Performers",
          sub: "Mejores ISPs (top 25%)",
          otLabel: "Otros canales de las mismas ISPs",
          insightText: [
            "Los mejores ISPs cobran 65% antes de día 5 con OnePay",
            " \u2014 vs. 55% por otros canales de las mismas empresas. La diferencia se amplía desde el día 1.",
          ],
        },
        avg: {
          label: "OnePay Promedio",
          sub: "ISPs promedio",
          otLabel: "Otros canales de las mismas ISPs",
          insightText: [
            "Incluso las ISPs promedio superan a sus propios canales tradicionales",
            " \u2014 4x más rápido en primeras 24h (18% vs. 4.4%). Día 5: 52% vs. 33%.",
          ],
        },
      },
    },

    /* ─── Integraciones ─── */
    integraciones: {
      tag: "Integraciones",
      h2: ["Se conecta con tu sistema.", "Sin cambiar nada."],
      sub: "Integración directa con los principales sistemas de gestión ISP. API abierta para cualquier otro.",
      directa: "Integración directa",
      tuCRM: "+ Tu CRM",
      tuCRMsub: "API abierta — nos integramos",
      mediosPago: "Medios de pago",
      pronto: "PRONTO",
    },

    /* ─── Resultados ─── */
    resultados: {
      tag: "Resultados en 90 días",
      h2: "Lo que obtienes con OnePay",
      cards: [
        { t: "Cobra 3x más rápido", bf: "Día 18", af: "Día 5.8", m: "+15-25pp", d: "pagos antes de día 10" },
        { t: "50% por WhatsApp", bf: "0% digital", af: "30-50%", m: "del total", d: "cobrado por canal digital" },
        { t: "Menos tickets", bf: "500+ llamadas", af: "Automático", m: "-20-30%", d: "en tickets operativos" },
        { t: "Flujo predecible", bf: "No sé cuánto", af: "Dashboard", m: "Tiempo real", d: "conciliación y predicción" },
      ],
    },

    /* ─── CicloFinanciero ─── */
    ciclo: {
      tag: "El ciclo completo",
      h2: ["No solo cobramos.", "Cerramos todo el ciclo financiero."],
      sub: "Desde que entra la plata hasta que se dispersa.",
      items: [
        { t: "Recaudo inteligente", st: "Activo", ds: "Cobro automatizado multicanal con behavioral intelligence.", dt: "WhatsApp, email, portal y llamada IA. Secuencias adaptativas por pagador. Conciliación automática." },
        { t: "Tesorería en tiempo real", st: "Activo", ds: "Dashboard de conciliación, predicción y reportes.", dt: "Todos tus cobros en un solo lugar. Predice flujo semanal. Reportes por canal, fecha y estado. Sin cruzar archivos de bancos." },
        { t: "Dispersiones", st: "Activo", ds: "Pago a terceros y desembolsos automáticos.", dt: "Turbo ACH (intrabancario H2H), Bre-B (instantáneo vía Banco de la República) y ACH estándar. Elige según urgencia y costo." },
        { t: "Tarjetas corporativas", st: "Próximamente", ds: "Control de gastos empresariales integrado.", dt: "Tarjetas físicas y virtuales con límites por persona y categoría. Todo visible en un dashboard." },
        { t: "Servicios públicos", st: "Activo", ds: "Recaudo de utilities con la misma infraestructura.", dt: "Gas, energía, agua, telecomunicaciones. Ya operamos con EPM Gas, Surtigas, Movistar y Grupo Promigas." },
      ],
      statusActive: "Activo",
      statusSoon: "Próximamente",
      dispersionesTitle: "Dispersiones \u2014 Tres canales",
      channels: [
        { n: "Turbo ACH", t: "5 min \u2013 2 horas", co: "Intrabancario Host-to-Host", d: "Transferencias directas con bancos principales. Bancolombia <30 min, Davivienda <20 min, Nequi <5 min. 24/7 en principales bancos." },
        { n: "Bre-B", t: "< 5 minutos", co: "Banco de la República", d: "Pagos instantáneos vía Bre-B. Personas naturales y jurídicas. Todos los bancos con llave registrada, 24/7." },
        { n: "ACH estándar", t: "6 \u2013 30 horas", co: "Menor costo", d: "Rieles ACH bancarios. Hasta 36h hábiles o 72h en fines de semana. Menor costo por transacción." },
      ],
    },

    /* ─── InvoiceLifecycle ─── */
    invoiceLifecycle: {
      tag: "Motor de cobranza",
      h2: ["El ciclo de vida completo", "de cada factura"],
      sub: "Tú pones las reglas de negocio. OnePay ejecuta con IA.",
      subDetail: "Configura una vez: fecha de vencimiento, etapas, canales y plantillas. La IA decide cuándo, por dónde y qué mensaje enviar según el comportamiento de cada usuario.",
      nodes: [
        { label: "Recordatorio", day: "Antes de vencer", desc: "Aviso previo para que el usuario se prepare y pague a tiempo.", detail: "Reduce la cartera vencida desde el inicio. Los usuarios que reciben recordatorio previo pagan 2.3x más rápido que los que no." },
        { label: "Vence hoy", day: "Día 0", desc: "Mensaje con link de pago directo + PDF adjunto de la factura.", detail: "El momento de mayor urgencia. El usuario ve su factura, el monto y paga en 4 clicks sin salir de WhatsApp. 60%+ de los pagos ocurren aquí." },
        { label: "Vencido", day: "Día 1-5", desc: "Recordatorio inteligente: hora y canal óptimo según comportamiento del usuario.", detail: "Recupera usuarios que olvidaron o no pudieron pagar. La IA elige el mejor momento: Juan paga viernes 6pm \u2192 mensaje viernes 5pm. María paga día de quincena \u2192 mensaje día 15." },
        { label: "Pre-corte", day: "Día 6-9", desc: "Escalamiento: cambia canal, tono del mensaje. Urgencia alta.", detail: "Activar la urgencia antes del corte para evitar la desconexión. El usuario entiende que el corte es inminente y tiene una última ventana para pagar sin perder el servicio." },
        { label: "Llamada IA", day: "Día 10-15", desc: "Agente de voz IA llama, contextualiza la deuda, envía link en la llamada.", detail: "Llegar a usuarios que no responden a canales digitales. Personas mayores o que no leen mensajes reciben una llamada con voz natural que les guía al pago." },
        { label: "Cortado", day: "Post-corte", desc: "Notificación de corte + última oportunidad de pago para reconexión.", detail: "Convertir el corte en oportunidad de recuperación inmediata. El usuario puede pagar y reactivar su servicio automáticamente sin llamar al ISP." },
        { label: "Recuperación", day: "Re-activación", desc: "Secuencia de re-activación para usuarios que cancelaron o fueron cortados.", detail: "Recuperar ingresos de usuarios perdidos. Campañas programadas con ofertas o facilidades de pago para re-enganchar suscriptores inactivos." },
      ],
      callout: ["En cada etapa:", " si el usuario paga, se concilia automáticamente y la secuencia se detiene. ", "Sin intervención manual.", " La mayoría paga sin necesitar más de 1 recordatorio."],
    },

    /* ─── Dashboard Cobranza ─── */
    dashboard: {
      title: "Recordatorios de cobranza",
      sub: "Historial de notificaciones y llamadas enviadas por reglas de cobranza.",
      toggles: ["~2.000 suscriptores", "~40.000 suscriptores"],
      totalLabel: "Total de recordatorios",
      totalSub: "Notificaciones enviadas",
      tasaLabel: "Tasa de entrega",
      llamadasLabel: "Llamadas AI este mes",
      llamadasSub: "Uso vs cuota mensual",
      tendencia: "Tendencia semanal",
      tendenciaSub: "Recordatorios por semana (últimos 3 meses)",
      recordatoriosHastaPago: "Recordatorios hasta el pago",
      recordatoriosHastaPagoSub: "Cobros pagados según cantidad de recordatorios",
      barLabels: ["Sin recordatorio", "1", "2", "3", "4", "5+"],
      buscar: "Buscar",
      tableHeaders: ["ID", "Cobro", "Canal", "Cobranza", "Regla", "Estado", "Creado"],
      data: [
        {
          label: "ISP pequeña (~2.000 suscriptores)",
          total: "19.608",
          tasa: "78.1%",
          tasaSub: "15.320 enviados, 4.288 fallidos",
          llamadas: "500/500",
          tabla: [
            { id: "8fb7b1", cobro: "Factura #111342 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
            { id: "12d508", cobro: "Factura #111341 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
            { id: "4c9c0c", cobro: "Factura #111339 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
            { id: "48d2af", cobro: "Factura #111337 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
          ],
        },
        {
          label: "ISP grande (~40.000 suscriptores)",
          total: "89.290",
          tasa: "100%",
          tasaSub: "89.290 enviados, 0 fallidos",
          llamadas: "1.250/1.250",
          tabla: [
            { id: "97a3f4", cobro: "VALOR A PAGAR - 1110593893", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
            { id: "14fc35", cobro: "VALOR A PAGAR - 15206888", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
            { id: "9ac968", cobro: "VALOR A PAGAR - 16431588", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
            { id: "caa952", cobro: "VALOR A PAGAR - 1030580684", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
          ],
        },
      ],
    },

    /* ─── Reconciliation ─── */
    reconciliation: {
      tag: "Conciliación",
      h2: ["Cada peso rastreado.", "Cada movimiento conciliado."],
      sub: "Conciliación operativa para el día a día. Contable para tu equipo financiero. Descargable en Excel y PDF.",
      tabs: [
        { l: "Operativa" },
        { l: "Contable" },
      ],
      /* Operativa tab */
      flowSteps: ["Factura", "Cobro", "Pago"],
      detallePorFactura: "Detalle por factura",
      infoFactura: "Información de la factura",
      infoFacturaRows: [["Nombre", "Factura - 101207"], ["Proveedor", "wisphub"], ["Monto", "$65.000"], ["Estado", "Conciliada"]],
      intentoPago: "Intento de pago",
      intentoPagoRows: [["Estado", "Pagado"], ["Monto", "$65.000"], ["Método", "NEQUI ****0005"], ["Tipo", "Depósito electrónico"]],
      operativaCallout: ["Cada factura tiene trazabilidad completa:", " con qué pagó, si abrió el mensaje, si abandonó el pago, cuántos recordatorios recibió, por qué canal, y cuándo se concilió."],
      /* Contable tab */
      conciliacionNodos: "Conciliación por nodos",
      conciliacionNodosSub: "Cada nodo agrupa créditos y débitos relacionados. Tu equipo financiero ve todo cuadrado. Exportable a Excel y PDF.",
      nodeMovements: [
        { concept: "Retención en la fuente", val: "-$1.315,16" },
        { concept: "Descuento por cargo extra ($85.000)", val: "-$2.677,50" },
        { concept: "Pago aprobado", val: "+$87.677,50" },
      ],
      historicoSaldos: "Histórico de saldos",
      balanceFilters: ["Todos", "Entradas", "Salidas", "Reservas"],
      balanceAll: [
        { c: "Pago aprobado", v: "+$85.000" },
        { c: "Procesamiento OnePay", v: "-$952" },
        { c: "Pago aprobado", v: "+$65.000" },
      ],
      balanceEntradas: [
        { c: "Pago aprobado", v: "+$85.000" },
        { c: "Pago aprobado", v: "+$65.000" },
        { c: "Pago aprobado", v: "+$60.000" },
      ],
      balanceSalidas: [
        { c: "Procesamiento OnePay", v: "-$952" },
        { c: "Retención en la fuente", v: "-$1.315" },
        { c: "Descuento cargo extra", v: "-$2.678" },
      ],
      balanceReservas: "Sin reservas activas",
      contableCallout: ["Descarga en Excel y PDF cuando quieras.", " Cada movimiento ya está categorizado y agrupado por nodo. Tu equipo financiero cuadra en minutos, no en días."],
    },

    /* ─── Pricing ─── */
    pricing: {
      tag: "Precios",
      h2: "Transparente. Sin letra chica.",
      sub: "Tarifa transaccional + SaaS mensual. Sin permanencia. Resultado desde el primer mes.",
      recommended: "RECOMENDADO",
      planIdeal: "Tu plan ideal",
      seleccionado: "Seleccionado",
      sugerido: "Sugerido: ",
      copMes: "COP / mes + transaccional",
      planLabels: {
        tarjetas: "Tarjetas",
        pseBilleteras: "PSE/billeteras",
        dispACH: "Dispersión ACH",
        dispTurbo: "Dispersión Turbo",
        llamadasIA: "Llamadas IA",
        ivaNote: "+ IVA",
      },
      plans: [
        {
          n: "Essential",
          saas: "$600.000",
          tc: "2.5% + 800",
          pse: "2.200",
          dispACH: "$1.500 + 0.2%",
          dispTurbo: "$2.500 + 0.2%",
          calls: "Sin llamadas",
          callNote: null,
          feats: ["Recaudo + suscripciones", "Procesamiento local", "Tesorería básica", "2 recordatorios/usuario/mes"],
        },
        {
          n: "Pro",
          saas: "$1.800.000",
          tc: "2% + 500",
          pse: "1.680",
          dispACH: "$1.000 + 0.2%",
          dispTurbo: "$2.000 + 0.2%",
          calls: "500/mes",
          callNote: "Numeración USA por defecto. Colombia: +$590.000/mes",
          feats: ["Todo Essential +", "WhatsApp personalizado", "Plantillas de cobranza", "3 recordatorios/usuario/mes"],
          star: true,
        },
        {
          n: "Growth",
          saas: "$5.500.000",
          tc: "1.85% + 300",
          pse: "1.000",
          dispACH: "$800 + 0.2%",
          dispTurbo: "$1.500 + 0.2%",
          calls: "1.250/mes",
          callNote: "Numeración USA por defecto. Colombia: +$1.350.000/mes",
          feats: ["Todo Pro +", "Tesorería corporativa", "Plantillas personalizadas", "Soporte prioritario 8x5", "Recordatorios ilimitados"],
        },
      ],
      /* ROI Calculator */
      roiTitle: "Calculadora de ROI",
      roiSub: "Ajusta los parámetros de tu ISP y ve el impacto estimado de OnePay en tu negocio.",
      sliders: {
        subs: "Suscriptores activos: ",
        ticket: "Ticket promedio: ",
        tasa: "Tasa recaudo actual: ",
        personas: "Personas en cobranza: ",
        dispersiones: "Dispersiones mensuales (proveedores + nomina): ",
        plan: "Plan: ",
        planSugerido: " (sugerido)",
        auto: "Auto",
      },
      results: {
        plan: "Plan",
        recaudoAdicional: "Recaudo adicional / mes",
        tasaLabel: "Tasa: ",
        capacidadLiberada: "Capacidad liberada",
        personaLabel: " persona",
        personasLabel: " personas",
        tareasValor: " \u2192 tareas de mayor valor",
        ahorroGMF: "Ahorro GMF (2x1000)",
        ahorroGMFsub: "Modulo tesoreria ahorra 50% del 4x1000",
        inversionOnePay: "Inversión OnePay",
        saasLabel: "SaaS ",
        txLabel: " + tx ",
        roiNeto: "ROI neto mensual",
      },
      complementary: {
        velocidad: "Velocidad de cobro",
        velocidadVal: "~{dias} días",
        velocidadVs: "vs {diasMercado} días mercado",
        costoMensajeria: "Costo mensajería estimado",
        mensajeriaVal: "~5 msg/usuario/mes",
        impactoChurn: "Impacto en churn",
        impactoChurnVal: "Cobrar 3x más rápido",
        impactoChurnSub: "= menos cortes",
      },
      disclaimer: "Estimación basada en data real de +100 ISPs activas en OnePay (Feb 2026). Mejora de +12pp en tasa de recaudo. Mix de pago: 95% PSE/billeteras, 5% tarjetas. Capacidad liberada basada en salario mínimo integral ($2.9M/mes) \u00D7 80% automatización. Ahorro GMF: el módulo de tesorería permite pagar a proveedores y nómina ahorrando la mitad del 4x1000 (2x1000 = 0.2% sobre el monto dispersado). Resultados varían según adopción y base de suscriptores.",
    },

    /* ─── Seguridad ─── */
    seguridad: {
      tag: "Seguridad",
      h2: ["Tu plata está segura.", "La de tus usuarios, también."],
      sub: "Cumplimos los estándares más exigentes de la industria de pagos. Cada transacción está protegida de extremo a extremo.",
      certs: [
        { l: "PCI DSS Level 1", d: "Máximo estándar en pagos" },
        { l: "ISO 27001", d: "Seguridad de información" },
        { l: "Adquirente directo", d: "Visa & Mastercard" },
        { l: "Póliza cyber", d: "Cobertura integral" },
      ],
    },

    /* ─── Closing ─── */
    closing: {
      h2: ["Cobre en 5 días", "lo que hoy te toma 25."],
      sub: "Sin contratar más gente. Sin cambiar tu sistema. Resultados desde la primera semana.",
      bullets: ["\u2713 Sin permanencia", "\u2713 Piloto controlado", "\u2713 Soporte total"],
      footer: "Recaudo inteligente \u00B7 PCI DSS Level 1",
    },
  },

  /* ════════════════════════════════════════════════════════════════════════════
     PORTUGUESE (Brazilian PT-BR)
     ════════════════════════════════════════════════════════════════════════════ */
  pt: {
    /* ─── Nav ─── */
    nav: {
      recaudo: "Cobrança Inteligente",
      pciLabel: "PCI DSS L1",
    },

    /* ─── Hero ─── */
    hero: {
      tag: "ISPs",
      h1: ["Seus assinantes pagam em ", "5 dias", ", não em 25."],
      sub: "OnePay cobra via WhatsApp, concilia em tempo real e mostra quanto dinheiro vai entrar na sua conta esta semana.",
      stats: [
        { v: 100, s: "+", l: "Provedores ativos", sb: "com cobrança inteligente" },
        { v: 5.8, s: "d", l: "Dias em média", sb: "vs. 18 do mercado", d: 1 },
        { v: 93, s: "%", l: "Pagamentos bem-sucedidos", sb: "sem atrito" },
        { v: 15, s: "s", l: "Para pagar", sb: "4 cliques", p: "~" },
      ],
      marqueeCorpLabel: "Corporativos que confiam na OnePay",
      marqueeISPLabel: "Provedores que confiam na OnePay",
    },

    /* ─── Problema ─── */
    problema: {
      tag: "O problema",
      h2: "Entre faturar e receber existe uma brecha.\nEssa brecha é dinheiro que você já ganhou.",
      sub: "Os pagamentos atrasam, o bloqueio é a única ferramenta real, e sua equipe perde tempo cobrando em vez de aumentar a receita por assinante.",
      cards: [
        {
          t: "Lado empresa",
          its: [
            ["25-35%", "carteira vencida >30 dias"],
            ["2-3", "pessoas dedicadas a cobrar"],
            ["$8-12M", "COP/mês em cobrança"],
            ["Dia 18", "média para receber pagamento"],
            ["500+", "ligações manuais por mês"],
          ],
          q: "\u201CO dinheiro já foi faturado mas não chega. E o único recurso é o bloqueio.\u201D",
        },
        {
          t: "Lado assinante",
          its: [
            ["40%", "abandono no PSE"],
            ["17", "passos para pagar via PSE"],
            ["20%", "abertura de e-mails de cobrança"],
            ["0", "apps quer baixar"],
            ["3+", "tentativas para pagar"],
          ],
          q: "\u201CDona Maria não é inadimplente \u2014 pagar é que é difícil.\u201D",
        },
      ],
    },

    /* ─── Insight ─── */
    insight: {
      tag: "O insight",
      h2: ["Para cobrar é preciso resolver", "como as pessoas pagam"],
      sub: "A indústria otimiza a cobrança. Ninguém otimiza o pagamento. OnePay faz os dois.",
      questions: [
        { q: "Com o quê pagar?", w: "Gateways", d: "Visa, MC, Nequi, Daviplata, PSE, Bre-B" },
        { q: "Como pagar?", w: "Checkouts", d: "4 cliques, sem atrito, sem apps" },
        { q: "Onde pagar?", w: "OnePay", d: "WhatsApp \u2014 onde já estão 98%" },
        { q: "Como fazer a pessoa pagar?", w: "OnePay", d: "Behavioral intelligence + timing" },
      ],
      questionLabel: "Pergunta",
    },

    /* ─── Produto ─── */
    producto: {
      tag: "A experiência",
      h2: "Da fatura ao dinheiro na sua conta",
      sub: "Três canais, uma plataforma. O assinante escolhe. Você não toca em nada.",
      tabs: ["WhatsApp", "Portal", "Ligação IA"],
      tabTitles: ["Pagamento por WhatsApp", "Portal de Pagamentos", "Ligação com IA"],
      tabDescriptions: [
        "O assinante recebe a fatura no WhatsApp. Toca em \u201CIniciar pagamento\u201D e abre um WhatsApp Flow nativo \u2014 sem sair do app. Escolhe o método, paga, pronto.",
        "Portal web onde o assinante consulta o débito por referência, seleciona as faturas que quer pagar e completa o pagamento em um só lugar.",
        "Para carteira vencida. Cada empresa cria seu próprio agente de voz IA que liga como se fosse parte da equipe. Contextualiza a dívida, lida com objeções e envia link de pagamento pelo WhatsApp.",
      ],
      tabCtas: [
        "Clique em \u201CIniciar pagamento\u201D para ver o WhatsApp Flow",
        "Clique em \u201CConsultar\u201D para ver o fluxo completo",
        "Veja a conversa se desenrolar em tempo real",
      ],
      checks: {
        0: [
          "WhatsApp Flows nativo \u2014 sem sair do app",
          "98% de abertura vs 20% e-mail",
          "~15 segundos para concluir",
          "Todos os meios de pagamento",
          "Lembretes baseados em comportamento",
        ],
        1: [
          "Consulta por referência de pagamento",
          "Selecione uma, várias ou todas as faturas",
          "Múltiplos meios de pagamento",
          "Histórico completo sem senha",
        ],
        2: [
          "Gestão de carteira vencida",
          "Cada empresa cria seu próprio agente IA",
          "Voz natural \u2014 indistinguível de uma pessoa",
          "Tratamento de objeções em tempo real",
          "Envia link de pagamento durante a ligação",
          "Parâmetros de treinamento automáticos",
        ],
      },
      /* WhatsApp mockup text */
      wa: {
        cobroPdf: "Cobranca.pdf",
        cobroSize: "912 KB \u00B7 pdf",
        cobroMsg: ["\u{1F44B} ", "OnePay", " solicitou ", "$85.000", " para o pagamento da sua ", "Fatura Internet - Março", "."],
        cobroSafe: "Pagamentos seguros com OnePay",
        iniciarPago: "Iniciar pagamento",
        confirmMsg: ["Seu pagamento de ", "Fatura Internet - Março", " foi creditado com sucesso \u2705"],
        confirmReceipt: ["\u{1F3E6} ", "OnePay", " recebeu o dinheiro com sucesso."],
        confirmThanks: "Obrigado! \u2B50",
        documento: "Documento",
      },
      /* WhatsApp Flow overlay */
      flow: {
        cancel: "Cancelar",
        page1Title: "Detalhe do pagamento",
        page2Title: "Seu meio de pagamento",
        page3Title: "Concluído",
        bannerLine1: "Pague em ",
        bannerLine1b: "segundos",
        bannerLine1c: " sem",
        bannerLine2: "preocupações",
        bannerCredit: "Criado por ",
        bannerCreditBold: "onepay",
        labelTitulo: "Título",
        valueTitulo: "Fatura Internet - Março",
        labelTotal: "Total",
        termsText: ["Ao clicar em \u2018Iniciar pagamento\u2019, você aceita os ", "termos e condições"],
        selectAccountText: "Selecione uma das suas contas ou cartões cadastrados",
        safePay: "Pagamentos seguros com OnePay",
        txInProgress: "Transação em andamento",
        txUsed: "Você utilizou sua conta {method} como meio de pagamento.",
        txProcess: "Esta transação será processada imediatamente.",
        txThanks: "Obrigado por usar OnePay.",
        btnPay: "Iniciar pagamento",
        btnContinue: "Continuar",
        btnFinish: "Finalizar",
        managedBy: "Managed by OnePay.",
        learnMore: "Learn more",
      },
      /* Payment methods (WhatsApp) */
      payMethods: [
        { icon: "\u{1F4B3}", name: "Visa \u00B70193", sub: "Pagamentos com cartão são aprovados imediatamente." },
        { icon: "\u{1F3E6}", name: "PSE Bancolombia", sub: "Você já pagou com este método anteriormente." },
        { icon: "\u{1F4F1}", name: "Nequi \u00B76819", sub: "Pagamentos são aprovados imediatamente." },
        { icon: "\u{1F4F1}", name: "Daviplata", sub: "Carteira digital" },
      ],
      /* Portal mockup text */
      portal: {
        back: "\u2190 Voltar",
        consultaH: "Consulte e pague em segundos",
        consultaSub: "Digite a referência de pagamento",
        placeholder: "Ex: ABCD1234",
        errorField: "\u26A0\uFE0F Por favor, preencha este campo.",
        btnConsultar: "Consultar",
        tuConsulta: "Sua consulta",
        selectDeudas: "Selecione as faturas que deseja pagar.",
        valorPagar: "Valor a pagar:",
        refLabel: "Ref. ",
        creacionLabel: "Criação: ",
        venceLabel: " | Vence: ",
        totalSeleccionado: "Total selecionado",
        btnPagar: "Pagar",
        totalAPagar: "Total a pagar",
        pagoDe: "Pagamento de {n} faturas",
        metodoPago: "Meio de pagamento",
        portalPayMethods: [
          { name: "Mastercard \u00B78594", sub: "Taxa extra de 3,15%" },
          { name: "Visa \u00B72029", sub: "Taxa extra de 3,15%" },
          { name: "Nequi \u00B76819", sub: "Sem taxa extra" },
          { name: "PSE", sub: "Sem taxa extra" },
        ],
        pagoExitoso: "Pagamento realizado",
        conciliadoAuto: "\u2713 Conciliado automaticamente",
        footerSafe: "Pagamentos seguros com ",
        footerLang: "Português",
      },
      /* Deudas data labels */
      deudas: [
        { desc: "Internet Residencial 100Mbps - Fevereiro", ref: "FAC-2026-0218", fCreacion: "18 fev 2026", fVence: "5 mar 2026" },
        { desc: "Internet Residencial 100Mbps - Março", ref: "FAC-2026-0305", fCreacion: "5 mar 2026", fVence: "20 mar 2026" },
        { desc: "Taxa de reconexão", ref: "", fCreacion: "1 mar 2026", fVence: "15 mar 2026" },
        { desc: "Upgrade velocidade Dez", ref: "FAC-2025-1201", fCreacion: "1 dez 2025", fVence: "20 dez 2025" },
      ],
      /* AI Call */
      call: {
        agenteIA: "Agente IA",
        gestionCartera: "Gestão de carteira",
        transcripcion: "\u{1F4AC} Transcrição em tempo real",
        resumenIA: "\u{1F916} Resumo IA",
        resumenText: "O assinante aceitou receber link de pagamento pelo WhatsApp. Vai pagar parcialmente hoje (R$42.500) e o restante quando puder. Sentimento: cooperativo após objeções por falta de liquidez. Método preferido: Nequi.",
        parametrosLabel: "\u{1F9E0} Parâmetros aprendidos",
        parametros: [
          { k: "Objeção principal", v: "Falta de liquidez" },
          { k: "Gatilho", v: "Pagamento parcial" },
          { k: "Canal preferido", v: "WhatsApp + Nequi" },
          { k: "Horário", v: "Tarde (1\u00AA tentativa)" },
          { k: "Tom eficaz", v: "Empático, sem pressão" },
        ],
        lines: [
          { who: "ai", text: "Olá, boa tarde. Sou a Ana, da FibraNet. Falo com o senhor Carlos Martínez?" },
          { who: "user", text: "Sim, sou eu. O que precisa?" },
          { who: "ai", text: "Senhor Carlos, estou ligando porque o senhor tem uma fatura de $85.000 do plano de Internet Residencial que está vencida desde 18 de fevereiro. A gente queria ajudar o senhor a ficar em dia antes que tenha algum problema com o serviço." },
          { who: "user", text: "Ah, eu sei... é que esse mês tá bem apertado. Realmente não consegui pagar." },
          { who: "ai", text: "Entendo, senhor Carlos, e é por isso que estou ligando. O senhor sabia que pode fazer um pagamento parcial pra evitar o bloqueio? Assim não perde a conexão e completa o restante quando puder." },
          { who: "user", text: "E qual seria o mínimo? Porque tô bem apertado mesmo..." },
          { who: "ai", text: "Pagando pelo menos a metade, que seriam $42.500, já garante que não vai ter bloqueio. E o mais fácil é que eu mando um link no seu WhatsApp agora mesmo e o senhor paga por lá, sem fila, sem burocracia." },
          { who: "user", text: "Mas fico devendo o resto? Não vão me cobrar mais nada?" },
          { who: "ai", text: "Não senhor, o saldo fica registrado e o senhor pode pagar quando quiser. Não é gerada nenhuma cobrança adicional. Posso enviar o link então?" },
          { who: "user", text: "Tá bom, pode mandar. Vou ver se pago agora pelo Nequi." },
          { who: "ai", text: "Perfeito, senhor Carlos. Já enviei o link no WhatsApp. Lá o senhor pode escolher Nequi ou o meio que preferir. Qualquer coisa, é só me escrever por lá mesmo. Tenha um ótimo dia!" },
        ],
      },
    },

    /* ─── Timeline ─── */
    timeline: {
      tag: "Como funciona",
      h2: "Cobrança no piloto automático",
      sub: "Sequências inteligentes que se adaptam ao comportamento de cada pagador.",
      steps: [
        { lb: "Dia do faturamento", tt: "Criação automática de cobranças", dt: "Seu sistema de gestão gera a fatura \u2192 OnePay recebe instantaneamente via API. Links de pagamento únicos são criados e a sequência de cobrança personalizada é preparada." },
        { lb: "Cobrança inicial", tt: "WhatsApp + E-mail + Portal", dt: "O assinante recebe a fatura pelo WhatsApp com link direto (98% de abertura). Simultaneamente e-mail e portal. Botão de pagamento em um clique." },
        { lb: "Dia 3", tt: "Lembrete inteligente", dt: "Apenas para quem não pagou. O sistema analisa horário, dia e canal onde cada assinante tem maior probabilidade de responder." },
        { lb: "Dia 6-9", tt: "Escalonamento adaptativo", dt: "Behavioral intelligence muda canal, horário e mensagem automaticamente. Se não abriu WhatsApp \u2192 e-mail. Cada interação melhora a próxima tentativa." },
        { lb: "Dia 12-15", tt: "Ligação com IA", dt: "Agente de voz IA para quem não respondeu ao digital. Voz natural, contexto da fatura, envia link durante a ligação." },
        { lb: "Pagamento realizado", tt: "Conciliação instantânea", dt: "O pagamento é aplicado automaticamente no seu sistema de gestão. Sem reconciliar manualmente. Dashboard prevê o fluxo da semana." },
      ],
      callout: ["61,3% dos pagamentos são concluídos nas primeiras ", "53 horas"],
    },

    /* ─── Data ─── */
    data: {
      tag: "Dados reais \u00B7 Fevereiro 2026",
      h2: ["OnePay cobra mais rápido.", "Os números provam."],
      sub: "255.487 faturas processadas. Comparamos a velocidade de cobrança OnePay vs. canais tradicionais.",
      metricLabels: ["Faturas processadas", "Dias em média", "Cobrado em <5 dias"],
      metricSubs: ["fevereiro 2026"],
      chartTitle: "% faturas cobradas acumulado",
      toggles: [
        { k: "top", l: "Top Performers" },
        { k: "avg", l: "Média" },
      ],
      sets: {
        top: {
          label: "Top Performers",
          sub: "Melhores provedores (top 25%)",
          otLabel: "Outros canais dos mesmos provedores",
          insightText: [
            "Os melhores provedores cobram 65% antes do dia 5 com OnePay",
            " \u2014 vs. 55% por outros canais das mesmas empresas. A diferença se amplia desde o dia 1.",
          ],
        },
        avg: {
          label: "OnePay Média",
          sub: "Provedores médios",
          otLabel: "Outros canais dos mesmos provedores",
          insightText: [
            "Mesmo provedores médios superam seus próprios canais tradicionais",
            " \u2014 4x mais rápido nas primeiras 24h (18% vs. 4,4%). Dia 5: 52% vs. 33%.",
          ],
        },
      },
    },

    /* ─── Integrações ─── */
    integraciones: {
      tag: "Integrações",
      h2: ["Conecta com seu sistema.", "Sem mudar nada."],
      sub: "Integração direta com os principais sistemas de gestão ISP. API aberta para qualquer outro.",
      directa: "Integração direta",
      tuCRM: "+ Seu CRM",
      tuCRMsub: "API aberta — nós integramos",
      mediosPago: "Meios de pagamento",
      pronto: "EM BREVE",
    },

    /* ─── Resultados ─── */
    resultados: {
      tag: "Resultados em 90 dias",
      h2: "O que você obtém com OnePay",
      cards: [
        { t: "Cobre 3x mais rápido", bf: "Dia 18", af: "Dia 5.8", m: "+15-25pp", d: "pagamentos antes do dia 10" },
        { t: "50% via WhatsApp", bf: "0% digital", af: "30-50%", m: "do total", d: "cobrado por canal digital" },
        { t: "Menos chamados", bf: "500+ ligações", af: "Automático", m: "-20-30%", d: "em chamados operacionais" },
        { t: "Fluxo previsível", bf: "Não sei quanto", af: "Dashboard", m: "Tempo real", d: "conciliação e previsão" },
      ],
    },

    /* ─── CicloFinanciero ─── */
    ciclo: {
      tag: "O ciclo completo",
      h2: ["Não apenas cobramos.", "Fechamos todo o ciclo financeiro."],
      sub: "Desde que o dinheiro entra até ser repassado.",
      items: [
        { t: "Cobrança inteligente", st: "Ativo", ds: "Cobrança automatizada multicanal com behavioral intelligence.", dt: "WhatsApp, e-mail, portal e ligação IA. Sequências adaptativas por pagador. Conciliação automática." },
        { t: "Tesouraria em tempo real", st: "Ativo", ds: "Dashboard de conciliação, previsão e relatórios.", dt: "Todas as cobranças em um só lugar. Prevê fluxo semanal. Relatórios por canal, data e status. Sem cruzar arquivos de bancos." },
        { t: "Repasses", st: "Ativo", ds: "Pagamento a terceiros e desembolsos automáticos.", dt: "Turbo ACH (intrabancário H2H), Bre-B (instantâneo via Banco de la República) e ACH padrão. Escolha conforme urgência e custo." },
        { t: "Cartões corporativos", st: "Em breve", ds: "Controle de despesas empresariais integrado.", dt: "Cartões físicos e virtuais com limites por pessoa e categoria. Tudo visível em um dashboard." },
        { t: "Serviços públicos", st: "Ativo", ds: "Cobrança de utilities com a mesma infraestrutura.", dt: "Gás, energia, água, telecomunicações. Já operamos com EPM Gas, Surtigas, Movistar e Grupo Promigas." },
      ],
      statusActive: "Ativo",
      statusSoon: "Em breve",
      dispersionesTitle: "Repasses \u2014 Três canais",
      channels: [
        { n: "Turbo ACH", t: "5 min \u2013 2 horas", co: "Intrabancário Host-to-Host", d: "Transferências diretas com os principais bancos. Bancolombia <30 min, Davivienda <20 min, Nequi <5 min. 24/7 nos principais bancos." },
        { n: "Bre-B", t: "< 5 minutos", co: "Banco de la República", d: "Pagamentos instantâneos via Bre-B. Pessoas físicas e jurídicas. Todos os bancos com chave registrada, 24/7." },
        { n: "ACH padrão", t: "6 \u2013 30 horas", co: "Menor custo", d: "Trilhos ACH bancários. Até 36h úteis ou 72h em finais de semana. Menor custo por transação." },
      ],
    },

    /* ─── InvoiceLifecycle ─── */
    invoiceLifecycle: {
      tag: "Motor de cobrança",
      h2: ["O ciclo de vida completo", "de cada fatura"],
      sub: "Você define as regras de negócio. OnePay executa com IA.",
      subDetail: "Configure uma vez: data de vencimento, etapas, canais e templates. A IA decide quando, por onde e qual mensagem enviar conforme o comportamento de cada assinante.",
      nodes: [
        { label: "Lembrete", day: "Antes do vencimento", desc: "Aviso prévio para que o assinante se prepare e pague em dia.", detail: "Reduz a carteira vencida desde o início. Assinantes que recebem lembrete prévio pagam 2,3x mais rápido do que os que não recebem." },
        { label: "Vence hoje", day: "Dia 0", desc: "Mensagem com link de pagamento direto + PDF da fatura em anexo.", detail: "O momento de maior urgência. O assinante vê a fatura, o valor e paga em 4 cliques sem sair do WhatsApp. 60%+ dos pagamentos acontecem aqui." },
        { label: "Vencido", day: "Dia 1-5", desc: "Lembrete inteligente: horário e canal ideais conforme o comportamento do assinante.", detail: "Recupera assinantes que esqueceram ou não conseguiram pagar. A IA escolhe o melhor momento: João paga sexta 18h \u2192 mensagem sexta 17h. Maria paga no dia do pagamento \u2192 mensagem dia 15." },
        { label: "Pré-bloqueio", day: "Dia 6-9", desc: "Escalonamento: muda canal, tom da mensagem. Alta urgência.", detail: "Ativar a urgência antes do bloqueio para evitar a suspensão. O assinante entende que o bloqueio é iminente e tem uma última janela para pagar sem perder o serviço." },
        { label: "Ligação IA", day: "Dia 10-15", desc: "Agente de voz IA liga, contextualiza a dívida, envia link na ligação.", detail: "Alcançar assinantes que não respondem a canais digitais. Pessoas mais velhas ou que não leem mensagens recebem uma ligação com voz natural que os guia ao pagamento." },
        { label: "Bloqueado", day: "Pós-bloqueio", desc: "Notificação de bloqueio + última oportunidade de pagamento para reconexão.", detail: "Transformar o bloqueio em oportunidade de recuperação imediata. O assinante pode pagar e reativar o serviço automaticamente sem ligar para o provedor." },
        { label: "Recuperação", day: "Reativação", desc: "Sequência de reativação para assinantes que cancelaram ou foram bloqueados.", detail: "Recuperar receita de assinantes perdidos. Campanhas programadas com ofertas ou facilidades de pagamento para reconquistar assinantes inativos." },
      ],
      callout: ["Em cada etapa:", " se o assinante paga, a conciliação é automática e a sequência para. ", "Sem intervenção manual.", " A maioria paga sem precisar de mais de 1 lembrete."],
    },

    /* ─── Dashboard Cobrança ─── */
    dashboard: {
      title: "Lembretes de cobrança",
      sub: "Histórico de notificações e ligações enviadas por regras de cobrança.",
      toggles: ["~2.000 assinantes", "~40.000 assinantes"],
      totalLabel: "Total de lembretes",
      totalSub: "Notificações enviadas",
      tasaLabel: "Taxa de entrega",
      llamadasLabel: "Ligações IA este mês",
      llamadasSub: "Uso vs cota mensal",
      tendencia: "Tendência semanal",
      tendenciaSub: "Lembretes por semana (últimos 3 meses)",
      recordatoriosHastaPago: "Lembretes até o pagamento",
      recordatoriosHastaPagoSub: "Cobranças pagas conforme quantidade de lembretes",
      barLabels: ["Sem lembrete", "1", "2", "3", "4", "5+"],
      buscar: "Buscar",
      tableHeaders: ["ID", "Cobrança", "Canal", "Campanha", "Regra", "Status", "Criado"],
      data: [
        {
          label: "Provedor pequeno (~2.000 assinantes)",
          total: "19.608",
          tasa: "78.1%",
          tasaSub: "15.320 enviados, 4.288 falharam",
          llamadas: "500/500",
          tabla: [
            { id: "8fb7b1", cobro: "Fatura #111342 - Plano 400MBT CALI", canal: "Ligação", cobranza: "Ultranet cobrança", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 32 min" },
            { id: "12d508", cobro: "Fatura #111341 - Plano 400MBT CALI", canal: "Ligação", cobranza: "Ultranet cobrança", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 32 min" },
            { id: "4c9c0c", cobro: "Fatura #111339 - Plano 400MBT CALI", canal: "Ligação", cobranza: "Ultranet cobrança", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 32 min" },
            { id: "48d2af", cobro: "Fatura #111337 - Plano 400MBT CALI", canal: "Ligação", cobranza: "Ultranet cobrança", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 32 min" },
          ],
        },
        {
          label: "Provedor grande (~40.000 assinantes)",
          total: "89.290",
          tasa: "100%",
          tasaSub: "89.290 enviados, 0 falharam",
          llamadas: "1.250/1.250",
          tabla: [
            { id: "97a3f4", cobro: "VALOR A PAGAR - 1110593893", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 28 min" },
            { id: "14fc35", cobro: "VALOR A PAGAR - 15206888", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 28 min" },
            { id: "9ac968", cobro: "VALOR A PAGAR - 16431588", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 28 min" },
            { id: "caa952", cobro: "VALOR A PAGAR - 1030580684", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Quando uma cobrança é criada", estado: "Enviado", creado: "há 28 min" },
          ],
        },
      ],
    },

    /* ─── Reconciliation ─── */
    reconciliation: {
      tag: "Conciliação",
      h2: ["Cada centavo rastreado.", "Cada movimentação conciliada."],
      sub: "Conciliação operacional para o dia a dia. Contábil para sua equipe financeira. Baixe em Excel e PDF.",
      tabs: [
        { l: "Operacional" },
        { l: "Contábil" },
      ],
      /* Operativa tab */
      flowSteps: ["Fatura", "Cobrança", "Pagamento"],
      detallePorFactura: "Detalhe por fatura",
      infoFactura: "Informações da fatura",
      infoFacturaRows: [["Nome", "Fatura - 101207"], ["Provedor", "wisphub"], ["Valor", "$65.000"], ["Status", "Conciliada"]],
      intentoPago: "Tentativa de pagamento",
      intentoPagoRows: [["Status", "Pago"], ["Valor", "$65.000"], ["Método", "NEQUI ****0005"], ["Tipo", "Depósito eletrônico"]],
      operativaCallout: ["Cada fatura tem rastreabilidade completa:", " com o quê pagou, se abriu a mensagem, se abandonou o pagamento, quantos lembretes recebeu, por qual canal, e quando foi conciliada."],
      /* Contable tab */
      conciliacionNodos: "Conciliação por nós",
      conciliacionNodosSub: "Cada nó agrupa créditos e débitos relacionados. Sua equipe financeira vê tudo batendo. Exportável para Excel e PDF.",
      nodeMovements: [
        { concept: "Retenção na fonte", val: "-$1.315,16" },
        { concept: "Desconto por taxa extra ($85.000)", val: "-$2.677,50" },
        { concept: "Pagamento aprovado", val: "+$87.677,50" },
      ],
      historicoSaldos: "Histórico de saldos",
      balanceFilters: ["Todos", "Entradas", "Saídas", "Reservas"],
      balanceAll: [
        { c: "Pagamento aprovado", v: "+$85.000" },
        { c: "Processamento OnePay", v: "-$952" },
        { c: "Pagamento aprovado", v: "+$65.000" },
      ],
      balanceEntradas: [
        { c: "Pagamento aprovado", v: "+$85.000" },
        { c: "Pagamento aprovado", v: "+$65.000" },
        { c: "Pagamento aprovado", v: "+$60.000" },
      ],
      balanceSalidas: [
        { c: "Processamento OnePay", v: "-$952" },
        { c: "Retenção na fonte", v: "-$1.315" },
        { c: "Desconto taxa extra", v: "-$2.678" },
      ],
      balanceReservas: "Sem reservas ativas",
      contableCallout: ["Baixe em Excel e PDF quando quiser.", " Cada movimentação já está categorizada e agrupada por nó. Sua equipe financeira fecha em minutos, não em dias."],
    },

    /* ─── Pricing ─── */
    pricing: {
      tag: "Preços",
      h2: "Transparente. Sem letras miúdas.",
      sub: "Tarifa transacional + SaaS mensal. Sem fidelidade. Resultado desde o primeiro mês.",
      recommended: "RECOMENDADO",
      planIdeal: "Seu plano ideal",
      seleccionado: "Selecionado",
      sugerido: "Sugerido: ",
      copMes: "COP / mês + transacional",
      planLabels: {
        tarjetas: "Cartões",
        pseBilleteras: "PSE/carteiras",
        dispACH: "Repasse ACH",
        dispTurbo: "Repasse Turbo",
        llamadasIA: "Ligações IA",
        ivaNote: "+ IVA",
      },
      plans: [
        {
          n: "Essential",
          saas: "$600.000",
          tc: "2.5% + 800",
          pse: "2.200",
          dispACH: "$1.500 + 0.2%",
          dispTurbo: "$2.500 + 0.2%",
          calls: "Sem ligações",
          callNote: null,
          feats: ["Cobrança + assinaturas", "Processamento local", "Tesouraria básica", "2 lembretes/assinante/mês"],
        },
        {
          n: "Pro",
          saas: "$1.800.000",
          tc: "2% + 500",
          pse: "1.680",
          dispACH: "$1.000 + 0.2%",
          dispTurbo: "$2.000 + 0.2%",
          calls: "500/mês",
          callNote: "Numeração EUA por padrão. Colômbia: +$590.000/mês",
          feats: ["Tudo do Essential +", "WhatsApp personalizado", "Templates de cobrança", "3 lembretes/assinante/mês"],
          star: true,
        },
        {
          n: "Growth",
          saas: "$5.500.000",
          tc: "1.85% + 300",
          pse: "1.000",
          dispACH: "$800 + 0.2%",
          dispTurbo: "$1.500 + 0.2%",
          calls: "1.250/mês",
          callNote: "Numeração EUA por padrão. Colômbia: +$1.350.000/mês",
          feats: ["Tudo do Pro +", "Tesouraria corporativa", "Templates personalizados", "Suporte prioritário 8x5", "Lembretes ilimitados"],
        },
      ],
      /* ROI Calculator */
      roiTitle: "Calculadora de ROI",
      roiSub: "Ajuste os parâmetros do seu provedor e veja o impacto estimado de OnePay no seu negócio.",
      sliders: {
        subs: "Assinantes ativos: ",
        ticket: "Ticket médio: ",
        tasa: "Taxa de recebimento atual: ",
        personas: "Pessoas em cobrança: ",
        dispersiones: "Repasses mensais (fornecedores + folha): ",
        plan: "Plano: ",
        planSugerido: " (sugerido)",
        auto: "Auto",
      },
      results: {
        plan: "Plano",
        recaudoAdicional: "Recebimento adicional / mês",
        tasaLabel: "Taxa: ",
        capacidadLiberada: "Capacidade liberada",
        personaLabel: " pessoa",
        personasLabel: " pessoas",
        tareasValor: " \u2192 tarefas de maior valor",
        ahorroGMF: "Economia GMF (2x1000)",
        ahorroGMFsub: "Módulo tesouraria economiza 50% do 4x1000",
        inversionOnePay: "Investimento OnePay",
        saasLabel: "SaaS ",
        txLabel: " + tx ",
        roiNeto: "ROI líquido mensal",
      },
      complementary: {
        velocidad: "Velocidade de cobrança",
        velocidadVal: "~{dias} dias",
        velocidadVs: "vs {diasMercado} dias mercado",
        costoMensajeria: "Custo estimado de mensagens",
        mensajeriaVal: "~5 msg/assinante/mês",
        impactoChurn: "Impacto no churn",
        impactoChurnVal: "Cobrar 3x mais rápido",
        impactoChurnSub: "= menos bloqueios",
      },
      disclaimer: "Estimativa baseada em dados reais de +100 provedores ativos na OnePay (Fev 2026). Melhoria de +12pp na taxa de recebimento. Mix de pagamento: 95% PSE/carteiras, 5% cartões. Capacidade liberada baseada em salário mínimo integral ($2,9M/mês) \u00D7 80% automação. Economia GMF: o módulo de tesouraria permite pagar fornecedores e folha economizando metade do 4x1000 (2x1000 = 0,2% sobre o valor repassado). Resultados variam conforme adoção e base de assinantes.",
    },

    /* ─── Segurança ─── */
    seguridad: {
      tag: "Segurança",
      h2: ["Seu dinheiro está seguro.", "O dos seus assinantes, também."],
      sub: "Cumprimos os padrões mais exigentes da indústria de pagamentos. Cada transação é protegida de ponta a ponta.",
      certs: [
        { l: "PCI DSS Level 1", d: "Maior padrão em pagamentos" },
        { l: "ISO 27001", d: "Segurança da informação" },
        { l: "Adquirente direto", d: "Visa & Mastercard" },
        { l: "Apólice cyber", d: "Cobertura integral" },
      ],
    },

    /* ─── Closing ─── */
    closing: {
      h2: ["Cobre em 5 dias", "o que hoje leva 25."],
      sub: "Sem contratar mais gente. Sem mudar seu sistema. Resultados desde a primeira semana.",
      bullets: ["\u2713 Sem fidelidade", "\u2713 Piloto controlado", "\u2713 Suporte total"],
      footer: "Cobrança inteligente \u00B7 PCI DSS Level 1",
    },
  },
};
