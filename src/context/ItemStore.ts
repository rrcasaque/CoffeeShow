import { Item } from '@/models/Item';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const ItemState = {
  items: [] as Item[],
};

export const useItemStore = create(devtools(() => ItemState));
