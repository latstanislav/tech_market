import { useState } from 'react';
import styles from './TeamManagement.module.css';
import { Button, Input } from '@/shared/ui';
import type { TeamMember } from '@/shared/types/user';

interface TeamManagementProps {
  team: TeamMember[];
  onSave: (team: TeamMember[]) => void;
}

export const TeamManagement = ({ team, onSave }: TeamManagementProps) => {
  const [members, setMembers] = useState<TeamMember[]>(team);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    email: '',
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.position && newMember.email) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        position: newMember.position,
        email: newMember.email,
      };
      setMembers([...members, member]);
      setNewMember({ name: '', position: '', email: '' });
      setShowAddForm(false);
      onSave([...members, member]);
    }
  };

  const handleRemoveMember = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    onSave(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Команда</h2>
        <Button
          label="+ Добавить менеджера"
          secondClass="primary"
          onClick={() => setShowAddForm(true)}
        />
      </div>

      <p className={styles.hint}>
        Добавьте менеджеров, чтобы в чате отвечал конкретный «Иван Петров, Инженер», а не безликий «Админ»
      </p>

      {showAddForm && (
        <div className={styles.addForm}>
          <Input
            type="text"
            value={newMember.name || ''}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            placeholder="Имя"
          />
          <Input
            type="text"
            value={newMember.position || ''}
            onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
            placeholder="Должность"
          />
          <Input
            type="email"
            value={newMember.email || ''}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            placeholder="Email"
          />
          <div className={styles.formActions}>
            <Button
              label="Добавить"
              secondClass="primary"
              onClick={handleAddMember}
            />
            <Button
              label="Отмена"
              secondClass="secondary"
              onClick={() => {
                setShowAddForm(false);
                setNewMember({ name: '', position: '', email: '' });
              }}
            />
          </div>
        </div>
      )}

      {members.length === 0 ? (
        <div className={styles.empty}>Нет менеджеров. Добавьте первого менеджера.</div>
      ) : (
        <div className={styles.list}>
          {members.map((member) => (
            <div key={member.id} className={styles.member}>
              <div className={styles.info}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.position}>{member.position}</div>
                <div className={styles.email}>{member.email}</div>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveMember(member.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

