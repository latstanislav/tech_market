import { useState } from 'react';
import styles from './Settings.module.css';
import { CompanyProfile } from '@/widgets/settings/CompanyProfile';
import { TeamManagement } from '@/widgets/settings/TeamManagement';
import { Billing } from '@/widgets/settings/Billing';
import type { CompanyProfile as CompanyProfileType, TeamMember } from '@/shared/types/user';

const mockCompanyProfile: CompanyProfileType = {
  id: '1',
  name: 'ООО "ПромТех"',
  description: 'Производитель промышленного оборудования',
  certificates: [],
  team: [],
};

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'billing'>('profile');
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileType>(mockCompanyProfile);

  return (
    <div className={styles.settings}>
      <h1 className={styles.title}>Настройки и Профиль компании</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          О компании
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'team' ? styles.active : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Команда
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'billing' ? styles.active : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          Биллинг
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'profile' && (
          <CompanyProfile
            profile={companyProfile}
            onSave={(profile) => {
              setCompanyProfile(profile);
              console.log('Saved profile:', profile);
            }}
          />
        )}
        {activeTab === 'team' && (
          <TeamManagement
            team={companyProfile.team}
            onSave={(team) => {
              setCompanyProfile({ ...companyProfile, team });
              console.log('Saved team:', team);
            }}
          />
        )}
        {activeTab === 'billing' && <Billing />}
      </div>
    </div>
  );
};

