import { MutationTree } from 'vuex'

import { State } from './state'

export enum MutationTypes {
    SET_SHOW_MENU = 'SET_SHOW_MENU',
    SET_DARK_THEME = 'SET_DARK_THEME',
    SET_PRIMARY_COLOUR = 'SET_PRIMARY_COLOUR',
}

export interface Mutations<S = State> {
    [MutationTypes.SET_SHOW_MENU](state: S, show: boolean): void;
    [MutationTypes.SET_DARK_THEME](state: S, token: boolean): void;
    [MutationTypes.SET_PRIMARY_COLOUR](state: S, token: string | null): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_SHOW_MENU](state, show) {
        state.showMenu = show;
    },
    [MutationTypes.SET_DARK_THEME](state, isDark) {
        state.darkTheme = isDark;
    },
    [MutationTypes.SET_PRIMARY_COLOUR](state, colour) {
        state.primaryColour = colour;
    }
}