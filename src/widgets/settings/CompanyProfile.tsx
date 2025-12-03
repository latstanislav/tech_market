import { useState } from 'react';
import styles from './CompanyProfile.module.css';
import { Button, Input } from '@/shared/ui';
import type { CompanyProfile } from '@/shared/types/user';

interface CompanyProfileProps {
  profile: CompanyProfile;
  onSave: (profile: CompanyProfile) => void;
}

export const CompanyProfile = ({ profile, onSave }: CompanyProfileProps) => {
  const [formData, setFormData] = useState<CompanyProfile>(profile);

  const handleInputChange = (field: keyof CompanyProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>О компании</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Название компании *</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Введите название компании"
          />
        </div>

        <div className={styles.field}>
          <label>Логотип</label>
          <div className={styles.logoUpload}>
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className={styles.logoPreview} />
            ) : (
              <div className={styles.logoPlaceholder}>📷</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                // Handle file upload
                console.log('Upload logo', e.target.files);
              }}
            />
            <button className={styles.uploadButton}>Загрузить логотип</button>
          </div>
        </div>

        <div className={styles.field}>
          <label>Описание</label>
          <textarea
            className={styles.textarea}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Опишите вашу компанию..."
            rows={6}
          />
        </div>

        <div className={styles.field}>
          <label>Сертификаты дилерства (PDF)</label>
          <div className={styles.uploadArea}>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => {
                console.log('Upload certificates', e.target.files);
              }}
            />
            <p>Перетащите файлы или нажмите для выбора</p>
          </div>
          {formData.certificates.length > 0 && (
            <div className={styles.certificates}>
              {formData.certificates.map((cert) => (
                <div key={cert.id} className={styles.certificate}>
                  {cert.name}
                  <button onClick={() => console.log('Remove cert', cert.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          label="Сохранить"
          secondClass="primary"
          onClick={() => onSave(formData)}
        />
      </div>
    </div>
  );
};

