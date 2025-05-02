import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const responses = {
  en: {
    chatbot: "Our AI Chatbot service revolutionizes restaurant communication:\n\n📱 Key Features:\n• 24/7 automated customer service\n• Instant reservation management\n• Smart menu recommendations\n• Multilingual support (15+ languages)\n• Custom response training\n\n📊 Benefits:\n• Reduce staff workload by 75%\n• Handle 500+ concurrent conversations\n• 90% faster response time\n• 40% increase in online bookings\n\nWould you like to schedule a demo to learn more?",
    voice: "Our AI Voice Agent transforms phone operations:\n\n🎯 Core Capabilities:\n• Natural voice conversations\n• 24/7 call handling\n• Smart call routing\n• Multiple accent support\n• Custom voice training\n\n📈 Impact:\n• Handle 200+ concurrent calls\n• Reduce wait times by 95%\n• 60% cost reduction\n• 100% consistent service\n\nWould you like to schedule a demo to experience it yourself?",
    whatsapp: "Our WhatsApp Automation enhances customer engagement:\n\n💬 Features:\n• Automated booking flow\n• Order status updates\n• Smart promotions\n• Feedback collection\n• Re-engagement campaigns\n\n📱 Capabilities:\n• Rich media messages\n• Payment integration\n• Location sharing\n• Quick replies\n• Template messages\n\nLet's schedule a consultation to discuss how this could work for your restaurant!",
    pricing: "We offer customized pricing based on your restaurant's specific needs and requirements. Our solutions are tailored to:\n\n✨ Your restaurant size\n✨ Feature requirements\n✨ Integration needs\n✨ Support level\n\nLet's schedule a consultation to discuss a package that perfectly fits your business. Would you like to book a call?",
    demo: "Experience our AI solutions firsthand!\n\n🎯 Demo includes:\n• Live AI interactions\n• Real-time analytics\n• Integration preview\n• ROI calculator\n\n⏱️ Duration: 30 minutes\n\n📋 You'll see:\n• Chatbot in action\n• Voice agent demo\n• WhatsApp automation\n• Dashboard features\n\nWhen would you like to schedule your demo?",
    integration: "Our integration process is smooth and efficient:\n\n🔄 Process:\n1. Initial setup (1 day)\n2. Custom training (2-3 days)\n3. Testing phase (2-3 days)\n4. Go-live (1 day)\n\n🛠️ Technical requirements:\n• Internet connection\n• Web browser\n• Phone line (for voice)\n• WhatsApp Business API (optional)\n\nLet's schedule a call to discuss your specific integration needs!",
    support: "We provide comprehensive support:\n\n🎯 Available channels:\n• 24/7 chat support\n• Phone support (9am-6pm)\n• Email support\n• Video tutorials\n• Knowledge base\n\n⚡ Response times:\n• Critical issues: < 1 hour\n• General queries: < 4 hours\n• Feature requests: < 24 hours\n\nHow can we help you today?",
    default: "Welcome to Optima AI Solutions! I can help you with:\n\n🤖 Our Services:\n• AI Chatbot\n• Voice Agent\n• WhatsApp Automation\n\n💡 Information about:\n• Features & capabilities\n• Custom solutions\n• Integration process\n• Success stories\n\nWhat would you like to know more about?"
  },
  de: {
    chatbot: "Unser AI Chatbot-Service revolutioniert die Restaurantkommunikation:\n\n📱 Hauptfunktionen:\n• 24/7 automatisierter Kundenservice\n• Sofortige Reservierungsverwaltung\n• Intelligente Menüempfehlungen\n• Mehrsprachige Unterstützung (15+ Sprachen)\n• Anpassbares Antworttraining\n\n📊 Vorteile:\n• 75% weniger Arbeitsbelastung\n• Bewältigung von 500+ gleichzeitigen Gesprächen\n• 90% schnellere Antwortzeit\n• 40% mehr Online-Buchungen\n\nMöchten Sie eine Demo vereinbaren, um mehr zu erfahren?",
    voice: "Unser AI Voice Agent transformiert den Telefonbetrieb:\n\n🎯 Kernfunktionen:\n• Natürliche Sprachgespräche\n• 24/7 Anrufbearbeitung\n• Intelligentes Call-Routing\n• Verschiedene Akzent-Unterstützung\n• Individuelles Stimmtraining\n\n📈 Auswirkungen:\n• Bewältigung von 200+ gleichzeitigen Anrufen\n• 95% kürzere Wartezeiten\n• 60% Kostenreduzierung\n• 100% konsistenter Service\n\nMöchten Sie einen Demo-Anruf vereinbaren?",
    whatsapp: "Unsere WhatsApp-Automatisierung verbessert das Kundenengagement:\n\n💬 Funktionen:\n• Automatisierter Buchungsablauf\n• Bestellstatus-Updates\n• Intelligente Werbeaktionen\n• Feedback-Sammlung\n• Wiederbindungskampagnen\n\n📱 Fähigkeiten:\n• Rich-Media-Nachrichten\n• Zahlungsintegration\n• Standortfreigabe\n• Schnellantworten\n• Vorlagennachrichten\n\nLassen Sie uns ein Beratungsgespräch vereinbaren!",
    pricing: "Wir bieten maßgeschneiderte Preise basierend auf den spezifischen Anforderungen Ihres Restaurants:\n\n✨ Ihre Restaurantgröße\n✨ Funktionsanforderungen\n✨ Integrationsbedarf\n✨ Support-Level\n\nLassen Sie uns ein Beratungsgespräch vereinbaren, um ein perfekt passendes Paket für Ihr Unternehmen zu besprechen. Möchten Sie einen Termin vereinbaren?",
    demo: "Erleben Sie unsere KI-Lösungen hautnah!\n\n🎯 Demo beinhaltet:\n• Live KI-Interaktionen\n• Echtzeit-Analytik\n• Integrations-Vorschau\n• ROI-Rechner\n\n⏱️ Dauer: 30 Minuten\n\n📋 Sie sehen:\n• Chatbot in Aktion\n• Voice Agent Demo\n• WhatsApp-Automatisierung\n• Dashboard-Funktionen\n\nWann möchten Sie Ihre Demo planen?",
    integration: "Unser Integrationsprozess ist reibungslos und effizient:\n\n🔄 Prozess:\n1. Ersteinrichtung (1 Tag)\n2. Individuelles Training (2-3 Tage)\n3. Testphase (2-3 Tage)\n4. Go-live (1 Tag)\n\n🛠️ Technische Anforderungen:\n• Internetverbindung\n• Webbrowser\n• Telefonleitung (für Voice)\n• WhatsApp Business API (optional)\n\nLassen Sie uns einen Termin vereinbaren, um Ihre spezifischen Integrationsbedürfnisse zu besprechen!",
    support: "Wir bieten umfassenden Support:\n\n🎯 Verfügbare Kanäle:\n• 24/7 Chat-Support\n• Telefon-Support (9-18 Uhr)\n• E-Mail-Support\n• Video-Tutorials\n• Wissensdatenbank\n\n⚡ Antwortzeiten:\n• Kritische Probleme: < 1 Stunde\n• Allgemeine Anfragen: < 4 Stunden\n• Feature-Anfragen: < 24 Stunden\n\nWie können wir Ihnen heute helfen?",
    default: "Willkommen bei Optima AI Solutions! Ich kann Ihnen helfen mit:\n\n🤖 Unsere Dienste:\n• AI Chatbot\n• Voice Agent\n• WhatsApp-Automatisierung\n\n💡 Informationen über:\n• Funktionen & Fähigkeiten\n• Maßgeschneiderte Lösungen\n• Integrationsprozess\n• Erfolgsgeschichten\n\nWorüber möchten Sie mehr erfahren?"
  }
};

const generateResponse = (message: string, lang: string = 'en'): string => {
  const lowerMessage = message.toLowerCase();
  const langResponses = responses[lang] || responses.en;
  
  // AI Solutions related queries
  if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot') ||
      lowerMessage.includes('chat-bot') || lowerMessage.includes('website bot') ||
      lowerMessage.includes('online chat')) {
    return langResponses.chatbot;
  }
  
  if (lowerMessage.includes('voice') || lowerMessage.includes('call') || 
      lowerMessage.includes('phone') || lowerMessage.includes('speak') ||
      lowerMessage.includes('talking')) {
    return langResponses.voice;
  }
  
  if (lowerMessage.includes('whatsapp') || lowerMessage.includes('message') || 
      lowerMessage.includes('messaging') || lowerMessage.includes('text') ||
      lowerMessage.includes('mobile')) {
    return langResponses.whatsapp;
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || 
      lowerMessage.includes('pricing') || lowerMessage.includes('expensive') ||
      lowerMessage.includes('preis') || lowerMessage.includes('kosten') ||
      lowerMessage.includes('package') || lowerMessage.includes('plan')) {
    return langResponses.pricing;
  }
  
  if (lowerMessage.includes('demo') || lowerMessage.includes('demonstration') || 
      lowerMessage.includes('show me') || lowerMessage.includes('zeigen') ||
      lowerMessage.includes('example') || lowerMessage.includes('trial')) {
    return langResponses.demo;
  }

  if (lowerMessage.includes('integrate') || lowerMessage.includes('setup') ||
      lowerMessage.includes('installation') || lowerMessage.includes('implement') ||
      lowerMessage.includes('configuration')) {
    return langResponses.integration;
  }

  if (lowerMessage.includes('support') || lowerMessage.includes('help') ||
      lowerMessage.includes('assistance') || lowerMessage.includes('contact') ||
      lowerMessage.includes('hilfe')) {
    return langResponses.support;
  }

  return langResponses.default;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, lang } = await req.json();
    const response = generateResponse(message, lang);

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});