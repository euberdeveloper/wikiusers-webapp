
export interface State {
    showMenu: boolean;
    darkTheme: boolean;
    primaryColour: string | null;

}

export const state: State = {
    showMenu: true,
    darkTheme: false,
    primaryColour: null,
}
