import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pet } from '../types/Pet';

export interface PetSearchProps {
  sorting: string[];
  page: number;
  limit: number;
  filters: { [key: string]: string }
}

export interface PetSearchInformation {
  limit: number;
  offset: number;
  pages: number;
  page: number;
  count: number;
}

const getPets = async (options: PetSearchProps):
  Promise<{ result: Pet[] & PetSearchInformation }> => {
  const search = await axios.post('https://test.adopets.app/v1/pet/search', {
    search: {
      ...options.filters,
      _fields: [
        'id',
        'uuid',
        'custom_code',
        'name',
        'specie_id',
        'breed_primary_id',
        'price',
        'created_date',
        'status_key',
        'branch_id',
        'payment_model_key',
        'sex_key',
        'size_key',
        'age_key',
      ],
      specie: {
        with: {
          _fields: [
            'id',
            'name',
          ],
        },
      },
      breed_primary: {
        with: {
          _fields: [
            'id',
            'name',
          ],
        },
      },
      branch: {
        with: {
          uuid: 'ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff',
          _fields: [
            'id',
            'uuid',
          ],
        },
      },
    },
    options: {
      page: options.page,
      limit: options.limit,
      sort: options.sorting,
    },
  });

  return search?.data?.data ?? null;
};

export default (options: PetSearchProps) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [information, setInformation] = useState<PetSearchInformation>({
    count: 0,
    limit: 10,
    offset: 0,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPets(options).then((response) => {
      const { result, ...info } = response;
      setPets(result);
      if (info) {
        setInformation(info as PetSearchInformation);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [options.sorting, options.filters, options.limit, options.page]);

  return {
    loading,
    pets,
    information,
  };
};
