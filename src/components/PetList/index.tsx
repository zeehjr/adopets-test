import React, { useState, useCallback } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Pet } from '../../types/Pet';
import usePetSearch from '../../hooks/usePetSearch';

const columns: ColumnProps<Pet>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Specie ID',
    dataIndex: 'specie_id',
    key: 'specie_id',
    sorter: true,
  },
  {
    title: 'Breed Primary ID',
    dataIndex: 'breed_primary_id',
    key: 'breed_primary_id',
    sorter: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
  },
  {
    title: 'Created Date',
    dataIndex: 'created_date',
    key: 'created_date',
    sorter: true,
    render: (val: string) => `${new Date(val).toLocaleDateString()} ${new Date(val).toLocaleTimeString()}`,
  },
  {
    title: 'Status',
    dataIndex: 'status_key',
    key: 'status_key',
    sorter: true,
  },
  {
    title: 'Branch ID',
    dataIndex: 'branch_id',
    key: 'branch_id',
    sorter: true,
  },
  {
    title: 'Payment Model',
    dataIndex: 'payment_model_key',
    key: 'payment_model_key',
    sorter: true,
  },
  {
    title: 'Sex',
    dataIndex: 'sex_key',
    key: 'sex_key',
    sorter: true,
    filterMultiple: false,
    filters: [
      {
        text: 'MALE',
        value: 'MALE',
      },
      {
        text: 'FEMALE',
        value: 'FEMALE',
      },
    ],
  },
  {
    title: 'Size',
    dataIndex: 'size_key',
    key: 'size_key',
    sorter: true,
    filterMultiple: false,
    filters: [
      {
        text: 'S',
        value: 'S',
      },
      {
        text: 'M',
        value: 'M',
      },
      {
        text: 'L',
        value: 'L',
      },
      {
        text: 'XL',
        value: 'XL',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age_key',
    key: 'age_key',
    sorter: true,
    filterMultiple: false,
    filters: [
      {
        text: 'BABY',
        value: 'BABY',
      },
      {
        text: 'YOUNG',
        value: 'YOUNG',
      },
      {
        text: 'ADULT',
        value: 'ADULT',
      },
      {
        text: 'SENIOR',
        value: 'SENIOR',
      },
    ],
  },
];

const showTotal = (total: number, range: any) => (
  <div>
    <span>
      {`${range[0]} - ${range[1]} of ${total}`}
    </span>

  </div>
);

export default () => {
  const [sorting, setSorting] = useState<string[]>([]);
  const [filtering, setFiltering] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState<number>(1);

  const { loading, pets, information } = usePetSearch({
    sorting, page, limit: 10, filters: filtering,
  });

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    const filter = Object.keys(filters).reduce<{ [key: string]: string }>((prev, curr) => {
      const currentFilter = filters[curr][0];
      return { ...prev, [curr]: currentFilter };
    }, {});

    setFiltering(filter);
    setPage(pagination.current);
    if (sorter.order) {
      if (sorter.order === 'ascend') {
        setSorting([sorter.field]);
        return;
      }
      setSorting([`-${sorter.field}`]);
      return;
    }

    setSorting([]);
  }, []);

  return (
    <div>
      <Table
        dataSource={pets}
        loading={loading}
        pagination={{
          current: information.page,
          pageSize: information.limit,
          total: information.count,
          showTotal,
        }}
        columns={columns}
        rowKey="uuid"
        onChange={handleTableChange}
      />

    </div>
  );
};
