import type { ChatMessage } from '@/widgets/chatbot/ChatMessage';

export interface AIResponse {
  content: string;
  error?: string;
}

/**
 * AI Service for equipment-related questions
 * This is a placeholder that simulates AI responses
 * In production, this would connect to an actual AI API (OpenAI, Anthropic, etc.)
 */
export class AIService {
  private static readonly MOCK_RESPONSES: Record<string, string> = {
    'привет': 'Здравствуйте! Я помогу вам с вопросами о промышленном оборудовании. Что вас интересует?',
    'каталог': 'В нашем каталоге представлено промышленное оборудование различных категорий: станки, инструменты, транспорт, электроника и материалы. Используйте фильтры для поиска нужного оборудования.',
    'цена': 'Цены на оборудование зависят от производителя, характеристик и состояния. Вы можете использовать фильтры по цене на главной странице для поиска оборудования в нужном диапазоне.',
    'производитель': 'Мы работаем с ведущими производителями: Caterpillar, Komatsu, Volvo, Liebherr, Hitachi и другими. Используйте фильтр "Производитель" для поиска оборудования конкретной марки.',
  };

  /**
   * Send a message to the AI and get a response
   * @param message - User's message
   * @param conversationHistory - Previous messages for context
   * @returns AI response
   */
  static async sendMessage(
    message: string,
    _conversationHistory: ChatMessage[] = []
  ): Promise<AIResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = message.toLowerCase().trim();

    // Check for exact matches in mock responses
    if (this.MOCK_RESPONSES[lowerMessage]) {
      return { content: this.MOCK_RESPONSES[lowerMessage] };
    }

    // Check for keywords
    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость')) {
      return {
        content:
          'Цены на оборудование варьируются в зависимости от характеристик. Для экскаваторов: от 15 до 45 млн тенге. Для бульдозеров: от 12 до 25 млн тенге. Для грузовиков: от 8 до 20 млн тенге. Используйте фильтры на главной странице для поиска по цене.',
      };
    }

    if (lowerMessage.includes('производитель') || lowerMessage.includes('марка')) {
      return {
        content:
          'Мы предлагаем оборудование от ведущих мировых производителей: Caterpillar (США), Komatsu и Hitachi (Япония), Volvo и Liebherr (Германия). Каждый производитель имеет свои преимущества в различных категориях техники.',
      };
    }

    if (lowerMessage.includes('категория') || lowerMessage.includes('тип')) {
      return {
        content:
          'У нас представлены следующие категории оборудования:\n• Станки - промышленное оборудование для производства\n• Инструменты - ручной и электроинструмент\n• Транспорт - грузовые автомобили и спецтехника\n• Электроника - электронное оборудование\n• Материалы - промышленные материалы',
      };
    }

    if (lowerMessage.includes('характеристики') || lowerMessage.includes('параметры')) {
      return {
        content:
          'Основные характеристики оборудования включают: производительность (мощность, грузоподъемность, объем ковша), страну производства, производителя, цену. Вы можете фильтровать оборудование по этим параметрам на главной странице.',
      };
    }

    if (lowerMessage.includes('доставка') || lowerMessage.includes('транспортировка')) {
      return {
        content:
          'Мы организуем доставку оборудования по всему Казахстану. Стоимость и сроки доставки зависят от габаритов и веса оборудования, а также от расстояния. Подробности уточняйте у наших менеджеров.',
      };
    }

    // Default response
    return {
      content:
        'Спасибо за ваш вопрос! Я могу помочь вам с информацией о:\n• Каталоге оборудования\n• Ценах и характеристиках\n• Производителях\n• Категориях техники\n• Доставке\n\nЗадайте более конкретный вопрос, и я постараюсь помочь.',
    };
  }

  /**
   * In production, this would make an actual API call:
   * 
   * static async sendMessage(
   *   message: string,
   *   conversationHistory: ChatMessage[] = []
   * ): Promise<AIResponse> {
   *   try {
   *     const response = await fetch('/api/ai/chat', {
   *       method: 'POST',
   *       headers: {
   *         'Content-Type': 'application/json',
   *       },
   *       body: JSON.stringify({
   *         message,
   *         history: conversationHistory,
   *         context: 'equipment_marketplace',
   *       }),
   *     });
   * 
   *     if (!response.ok) {
   *       throw new Error('AI service error');
   *     }
   * 
   *     const data = await response.json();
   *     return { content: data.response };
   *   } catch (error) {
   *     return {
   *       content: 'Извините, произошла ошибка. Попробуйте позже.',
   *       error: error instanceof Error ? error.message : 'Unknown error',
   *     };
   *   }
   * }
   */
}

