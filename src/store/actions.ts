import { ActionTree, ActionContext } from 'vuex'

import { State } from './state'
import { Mutations, MutationTypes } from './mutations'

export enum ActionTypes {
    TOGGLE_MENU = 'TOGGLE_MENU',
    TOGGLE_DARK_THEME = 'TOGGLE_DARK_THEME',
    CHANGE_PRIMARY_COLOUR = 'CHANGE_PRIMARY_COLOUR',
    RETRIEVE_DARK_THEME = 'RETRIEVE_DARK_THEME',
    RETRIEVE_PRIMARY_COLOUR = 'RETRIEVE_PRIMARY_COLOUR',
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionTypes.TOGGLE_MENU]({ commit }: AugmentedActionContext): void;
    [ActionTypes.TOGGLE_DARK_THEME]({ commit }: AugmentedActionContext): void;
    [ActionTypes.CHANGE_PRIMARY_COLOUR]({ commit }: AugmentedActionContext, colour: string | null): void;
    [ActionTypes.RETRIEVE_DARK_THEME]({ commit }: AugmentedActionContext): void;
    [ActionTypes.RETRIEVE_PRIMARY_COLOUR]({ commit }: AugmentedActionContext, colour: string | null): void;
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.TOGGLE_MENU]({ commit, state }) {
        commit(MutationTypes.SET_SHOW_MENU, !state.showMenu);
    },
    [ActionTypes.TOGGLE_DARK_THEME]({ commit, state }) {
        if (state.darkTheme) {
            localStorage.removeItem('isDarkTheme');
        }
        else {
            localStorage.setItem('isDarkTheme', 'true');
        }

        commit(MutationTypes.SET_DARK_THEME, !state.darkTheme);
    },
    [ActionTypes.CHANGE_PRIMARY_COLOUR]({ commit }, colour) {
        commit(MutationTypes.SET_PRIMARY_COLOUR, colour);

        if (colour) {
            localStorage.setItem('primaryColour', colour);
        }
        else {
            localStorage.removeItem('primaryColour');
        }
    },
    [ActionTypes.RETRIEVE_DARK_THEME]({ commit }) {
        const isDarkTheme = localStorage.getItem('isDarkTheme') !== null;
        commit(MutationTypes.SET_DARK_THEME, isDarkTheme);
    },
    [ActionTypes.RETRIEVE_PRIMARY_COLOUR]({ commit }) {
        const primaryColour = localStorage.getItem('primaryColour');
        commit(MutationTypes.SET_PRIMARY_COLOUR, primaryColour);
    },
}