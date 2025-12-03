import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './BulkImport.module.css';

interface BulkImportProps {
  onImport: (file: File) => void;
  onClose: () => void;
}

export const BulkImport = ({ onImport, onClose }: BulkImportProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<'xls' | 'xml'>('xls');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (extension === 'xls' || extension === 'xlsx') {
      setImportType('xls');
      setFile(selectedFile);
    } else if (extension === 'xml') {
      setImportType('xml');
      setFile(selectedFile);
    } else {
      alert('Поддерживаются только файлы XLS, XLSX и XML');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Массовый импорт товаров</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Поддерживаемые форматы:</p>
            <ul>
              <li>XLS / XLSX - Excel файлы с таблицей товаров</li>
              <li>XML - XML файлы с данными товаров</li>
            </ul>
            <p className={styles.hint}>
              Файл должен содержать колонки: Название, Категория, Серия, Описание, Характеристики
            </p>
          </div>

          <div
            className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {file ? (
              <div className={styles.fileInfo}>
                <div className={styles.fileIcon}>📄</div>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileSize}>
                  {(file.size / 1024).toFixed(2)} KB
                </div>
                <button
                  className={styles.removeFile}
                  onClick={() => setFile(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className={styles.dropIcon}>📤</div>
                <p>Перетащите файл сюда или нажмите для выбора</p>
                <input
                  type="file"
                  accept=".xls,.xlsx,.xml"
                  onChange={handleFileInput}
                  className={styles.fileInput}
                />
              </>
            )}
          </div>

          {file && (
            <div className={styles.preview}>
              <h3>Предпросмотр импорта</h3>
              <p>Тип файла: {importType.toUpperCase()}</p>
              <p className={styles.hint}>
                После импорта вы сможете проверить и отредактировать загруженные товары
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button label="Отмена" secondClass="secondary" onClick={onClose} />
          <Button
            label="Импортировать"
            secondClass="primary"
            onClick={handleImport}
            disabled={!file}
          />
        </div>
      </div>
    </div>
  );
};

