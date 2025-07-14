import React from 'react';
import { useView, ViewType } from '@/context/view/ViewContext';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const MenuButton = ({
  icon,
  onClick,
  type = 'primary',
}: {
  icon: React.ReactNode;
  onClick: () => void;
  type?: 'primary' | 'default';
}) => {
  return (
    <Button
      icon={icon}
      type={type}
      onClick={onClick}
      size="large"
      className="lg:!w-12 md:!w-10 !w-8 lg:!h-12 md:!h-10 !h-8 !rounded-full"
    />
  );
};

export const ViewToggleButton = ({
  viewType,
  setViewType,
  icon,
  type,
}: {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  icon: React.ReactNode;
  type: 'primary' | 'default';
}) => {
  return (
    <MenuButton type={type} icon={icon} onClick={() => setViewType(viewType)} />
  );
};

export const ViewToggleButtons = () => {
  const { viewType, setViewType } = useView();

  return (
    <div className="flex flex-col gap-3">
      <ViewToggleButton
        viewType="sticky"
        setViewType={setViewType}
        icon={<AppstoreOutlined />}
        type={viewType === 'sticky' ? 'primary' : 'default'}
      />
      <ViewToggleButton
        viewType="list"
        setViewType={setViewType}
        icon={<UnorderedListOutlined />}
        type={viewType === 'list' ? 'primary' : 'default'}
      />
    </div>
  );
};
