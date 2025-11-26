import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import { ChatMessageComponent, LoadingMessage } from './ChatMessage';
import type { ChatMessage } from './ChatMessage';
import { AIService } from '@/shared/api/aiService';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await AIService.sendMessage(trimmedMessage, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте позже.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: 'Здравствуйте! Я AI-помощник по промышленному оборудованию. Задайте мне любой вопрос о нашем каталоге, ценах, характеристиках или производителях.',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <div className={styles.chatbot}>
      {isOpen && (
        <div className={styles.chatbot__window}>
          <div className={styles.chatbot__header}>
            <div>
              <h3 className={styles.chatbot__headerTitle}>AI Помощник</h3>
              <p className={styles.chatbot__headerSubtitle}>
                Задайте вопрос об оборудовании
              </p>
            </div>
            <button
              className={styles.chatbot__closeButton}
              onClick={handleToggle}
              aria-label="Закрыть чат"
            >
              ×
            </button>
          </div>
          <div className={styles.chatbot__messages}>
            {messages.length === 0 ? (
              <div className={styles.chatbot__emptyState}>
                <div className={styles.chatbot__emptyStateIcon}>💬</div>
                <p className={styles.chatbot__emptyStateText}>
                  Начните диалог, задав вопрос об оборудовании
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessageComponent key={message.id} message={message} />
                ))}
                {isLoading && <LoadingMessage />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className={styles.chatbot__inputContainer}>
            <input
              ref={inputRef}
              type="text"
              className={styles.chatbot__input}
              placeholder="Введите ваш вопрос..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className={styles.chatbot__sendButton}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Отправить сообщение"
            >
              →
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.chatbot__button}
        onClick={handleToggle}
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

