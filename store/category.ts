import { defineStore } from 'pinia';
import { Category } from '~~/types/Category';

export type RootState = {
  items: Category[] | [];
};

export const useCategoryStore = defineStore({
  id: 'category-store',
  state: () =>
    ({
      items: [
        { id: 1, name: 'Análise de dados' },
        { id: 2, name: 'Armazenamento e Compartilhamento' },
        { id: 3, name: 'Computação em nuvem' },
        { id: 4, name: 'E-mail corporativo' },
        { id: 5, name: 'Ferramentas de colaboração' },
        { id: 6, name: 'Gestão de negócio' },
        { id: 7, name: 'Gestão de Projetos' },
        { id: 8, name: 'Identidade e acesso' },
        { id: 9, name: 'Presença Online' },
        { id: 10, name: 'Segurança' },
        { id: 11, name: 'Sistema Operacional' }
      ]
    } as RootState),
  actions: {},
  getters: {
    getCategories: (
      state
    ): Array<{ value: number | undefined; label: string }> => {
      const result: Array<{ value: number | undefined; label: string }> = [
        {
          label: 'Todos',
          value: undefined
        }
      ];

      const reMap = state.items.map(item => {
        return { label: item.name, value: item.id };
      });

      return [...result, ...reMap];
    }
  }
});
