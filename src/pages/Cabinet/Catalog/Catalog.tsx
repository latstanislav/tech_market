import { useState } from 'react';
import styles from './Catalog.module.css';
import {
  GroupsManager,
  PositionsTable,
  GroupEditor,
  PositionEditor,
  BulkImport,
} from '@/widgets/catalog';
import { Button } from '@/shared/ui';
import type {
  CatalogGroup,
  CatalogPosition,
  PositionDetails,
  MarketCategory,
} from '@/shared/types/catalog';

// Моковые данные
const mockCategories: MarketCategory[] = [
  { id: '1', name: 'Машиностроение' },
  { id: '2', name: 'Электротехника' },
  { id: '3', name: 'Металлургия' },
  { id: '4', name: 'Химическая промышленность' },
  { id: '5', name: 'Энергетика' },
];

const mockGroups: CatalogGroup[] = [
  {
    id: '1',
    name: 'Корневая группа',
    parentId: null,
    description: 'Основная группа каталога',
    status: 'published',
    positionCount: 5,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Печи и оборудование',
    parentId: '1',
    description: 'Плавильные печи и термическое оборудование',
    status: 'published',
    positionCount: 3,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
  },
];

const mockPositions: CatalogPosition[] = [
  {
    id: '1',
    name: 'Плавильная печь ПП-1000',
    sku: 'PP-1000',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    availability: 'in_stock',
    stock: 2,
    status: 'published',
    price: 2500000,
    priceFrom: false,
    orderCount: 12,
    groupId: '2',
    categoryId: '3',
    type: 'product',
  },
  {
    id: '2',
    name: 'Токарный станок ТС-500',
    sku: 'TS-500',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    availability: 'on_order',
    deliveryDays: 30,
    status: 'draft',
    price: 1800000,
    priceFrom: true,
    orderCount: 5,
    groupId: '1',
    categoryId: '1',
    type: 'product',
  },
];

export const Catalog = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'positions'>('groups');
  const [groups, setGroups] = useState<CatalogGroup[]>(mockGroups);
  const [positions, setPositions] = useState<CatalogPosition[]>(mockPositions);
  const [selectedGroup, setSelectedGroup] = useState<CatalogGroup | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionDetails | null>(null);
  const [showGroupEditor, setShowGroupEditor] = useState(false);
  const [showPositionEditor, setShowPositionEditor] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    setShowGroupEditor(true);
  };

  const handleEditGroup = (group: CatalogGroup) => {
    setSelectedGroup(group);
    setShowGroupEditor(true);
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    // Также нужно переместить позиции из удаленной группы
    setPositions((prev) =>
      prev.map((p) => (p.groupId === groupId ? { ...p, groupId: '1' } : p))
    );
  };

  const handleSaveGroup = (groupData: Partial<CatalogGroup>) => {
    if (selectedGroup) {
      setGroups((prev) =>
        prev.map((g) => (g.id === selectedGroup.id ? { ...g, ...groupData } : g))
      );
    } else {
      const newGroup: CatalogGroup = {
        id: Date.now().toString(),
        name: groupData.name || 'Новая группа',
        parentId: groupData.parentId || null,
        description: groupData.description,
        photo: groupData.photo,
        status: groupData.status || 'published',
        positionCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setGroups((prev) => [...prev, newGroup]);
    }
    setShowGroupEditor(false);
    setSelectedGroup(null);
  };

  const handleCreatePosition = () => {
    setSelectedPosition(null);
    setShowPositionEditor(true);
  };

  const handleEditPosition = (position: CatalogPosition) => {
    // Преобразуем CatalogPosition в PositionDetails
    const positionDetails: PositionDetails = {
      ...position,
      description: '',
      equipment: '',
      specifications: [],
      tags: [],
      searchQueries: [],
      photos: [],
      videos: [],
    };
    setSelectedPosition(positionDetails);
    setShowPositionEditor(true);
  };

  const handleDeletePosition = (positionId: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== positionId));
  };

  const handleCopyPosition = (positionId: string) => {
    const position = positions.find((p) => p.id === positionId);
    if (position) {
      const copied: CatalogPosition = {
        ...position,
        id: Date.now().toString(),
        name: `${position.name} (копия)`,
        sku: `${position.sku}-COPY`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orderCount: 0,
      };
      setPositions((prev) => [...prev, copied]);
    }
  };

  const handleAddDiscount = (positionId: string) => {
    console.log('Add discount for position:', positionId);
    // Здесь будет логика добавления скидки
  };

  const handleSavePosition = (positionData: Partial<PositionDetails>) => {
    if (selectedPosition) {
      setPositions((prev) =>
        prev.map((p) =>
          p.id === selectedPosition.id
            ? { ...p, ...positionData, updatedAt: new Date().toISOString() }
            : p
        )
      );
    } else {
      const newPosition: CatalogPosition = {
        id: Date.now().toString(),
        name: positionData.name || 'Новая позиция',
        sku: positionData.sku || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        availability: positionData.availability || 'in_stock',
        status: positionData.status || 'draft',
        price: positionData.price,
        priceFrom: positionData.priceFrom || false,
        orderCount: 0,
        groupId: positionData.groupId || '1',
        categoryId: positionData.categoryId || '',
        type: positionData.type || 'product',
        stock: positionData.stock,
        deliveryDays: positionData.deliveryDays,
      };
      setPositions((prev) => [...prev, newPosition]);
    }
    setShowPositionEditor(false);
    setSelectedPosition(null);
  };

  const handleImport = (file: File) => {
    console.log('Importing file:', file.name);
    // Здесь будет логика импорта файла
  };

  return (
    <>
      {showGroupEditor && (
        <GroupEditor
          group={selectedGroup}
          allGroups={groups}
          onClose={() => {
            setShowGroupEditor(false);
            setSelectedGroup(null);
          }}
          onSave={handleSaveGroup}
        />
      )}

      {showPositionEditor && (
        <PositionEditor
          position={selectedPosition}
          groups={groups}
          categories={mockCategories}
          onClose={() => {
            setShowPositionEditor(false);
            setSelectedPosition(null);
          }}
          onSave={handleSavePosition}
        />
      )}

      {showImport && (
        <BulkImport
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )}

      <div className={styles.catalog}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Мой Каталог</h1>
            <p className={styles.subtitle}>Управление группами и позициями</p>
          </div>
          <div className={styles.actions}>
            <Button
              label="Массовый импорт (XLS/XML)"
              secondClass="secondary"
              onClick={() => setShowImport(true)}
            />
            {activeTab === 'groups' && (
              <Button
                label="+ Создать группу"
                secondClass="primary"
                onClick={handleCreateGroup}
              />
            )}
            {activeTab === 'positions' && (
              <Button
                label="+ Добавить позицию"
                secondClass="primary"
                onClick={handleCreatePosition}
              />
            )}
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'groups' ? styles.active : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Группы
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'positions' ? styles.active : ''}`}
            onClick={() => setActiveTab('positions')}
          >
            Позиции
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'groups' && (
            <GroupsManager
              groups={groups}
              onEdit={handleEditGroup}
              onDelete={handleDeleteGroup}
              onCreate={handleCreateGroup}
            />
          )}

          {activeTab === 'positions' && (
            <PositionsTable
              positions={positions}
              onEdit={handleEditPosition}
              onDelete={handleDeletePosition}
              onCopy={handleCopyPosition}
              onAddDiscount={handleAddDiscount}
            />
          )}
        </div>
      </div>
    </>
  );
};

