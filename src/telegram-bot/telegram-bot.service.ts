import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class TelegramBotService {
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  @Start()
  async startCommand(ctx: Context) {
    const welcomeMessage =
      `Bienvenido al Servicio de Ayuda 🚀\n\n` +
      `Elige una opción del menú o escribe una pregunta:\n` +
      `1. 📊 Servicios de análisis de datos\n` +
      `2. 📞 Soporte al cliente\n` +
      `3. ❓ Preguntas frecuentes\n` +
      `4. 📡 Información sobre sensores\n` +
      `5. 🔧 Reportar un problema\n`;
    await ctx.reply(welcomeMessage);
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply(
      '¿En qué puedo ayudarte? Escribe una opción o una palabra clave para recibir ayuda.',
    );
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  // Respuestas a saludos y expresiones comunes
  @Hears(/^hi$|^hola$/i)
  async hearsHi(ctx: Context) {
    await ctx.reply('¡Hola! ¿Cómo estás? 😊');
  }

  @Hears(/^gracias$/i)
  async hearsThanks(ctx: Context) {
    await ctx.reply('¡De nada! Estoy aquí para ayudarte. 😊');
  }

  @Hears(/^servicios$/i)
  async hearsServices(ctx: Context) {
    const servicesMessage =
      `Nuestros servicios de monitoreo y análisis de datos incluyen:\n\n` +
      `1. 📈 Análisis de patrones de consumo de filamento\n` +
      `2. ⚡ Monitoreo de consumo energético\n` +
      `3. 🕒 Control de durabilidad y reemplazo de sensores\n` +
      `4. 📱 Integración de datos con OctoPrint y la app\n\n` +
      `Escribe el número del servicio para más detalles.`;
    await ctx.reply(servicesMessage);
  }

  @Hears(/^cliente$/i)
  async hearsClientSupport(ctx: Context) {
    await ctx.reply(
      'Puedes contactar a nuestro equipo de soporte al cliente llamando al 9619798424 o escribiendo a soporte@ejemplo.com.',
    );
  }

  // Preguntas frecuentes y sus respuestas
  @Hears(/^preguntas frecuentes$|^faqs$/i)
  async hearsFAQ(ctx: Context) {
    await ctx.reply(
      'Aquí tienes algunas preguntas comunes:\n\n' +
        `1. ¿Cómo se instala el sensor?\n` +
        `2. ¿Es compatible el sensor con OctoPrint?\n` +
        `3. ¿Qué datos puedo monitorear?\n` +
        `4. ¿Dónde se pueden ver los informes de consumo?\n\n` +
        `Escribe el número o la pregunta para recibir una respuesta específica.`,
    );
  }

  @Hears(/^¿cómo se instala el sensor\??|1$/i)
  async hearsSensorInstallation(ctx: Context) {
    await ctx.reply(
      'La instalación es sencilla. Conecta el sensor a tu impresora 3D y sincronízalo con OctoPrint. Encuentra la guía completa en www.ejemplo.com/instalacion.',
    );
  }

  @Hears(/^¿es compatible el sensor con OctoPrint\??|2$/i)
  async hearsOctoPrintCompatibility(ctx: Context) {
    await ctx.reply(
      'Sí, el sensor de Ejemplo es totalmente compatible con OctoPrint para que puedas monitorear y analizar datos directamente desde nuestra app.',
    );
  }

  @Hears(/^¿qué datos puedo monitorear\??|3$/i)
  async hearsMonitorData(ctx: Context) {
    await ctx.reply(
      'Puedes monitorear el consumo de filamento, el consumo energético, la duración de los trabajos de impresión, y recibir alertas de mantenimiento.',
    );
  }

  @Hears(/^¿dónde se pueden ver los informes de consumo\??|4$/i)
  async hearsConsumptionReports(ctx: Context) {
    await ctx.reply(
      'Los informes de consumo se pueden ver en la app, con gráficos detallados para cada aspecto de tu impresora 3D.',
    );
  }

  @Hears(/^información$/i)
  async hearsInformation(ctx: Context) {
    await ctx.reply(
      'Ofrece herramientas de monitoreo avanzadas para impresoras 3D, optimizadas para fábricas y usuarios de OctoPrint, proporcionando insights de consumo y mantenimiento.',
    );
  }

  @Hears(/^problema$/i)
  async hearsProblem(ctx: Context) {
    await ctx.reply(
      'Para reportar un problema, por favor envíanos un mensaje detallado o contáctanos al 9619798424. ¡Estamos aquí para ayudarte!',
    );
  }

  @Hears(/^adiós$|^bye$/i)
  async hearsBye(ctx: Context) {
    await ctx.reply(
      '¡Hasta luego! No dudes en regresar si necesitas ayuda. 👋',
    );
  }
}
