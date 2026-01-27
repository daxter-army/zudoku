import { type NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { type GAME_MODE } from "../contants";

export const ROUTE_OPTIONS: NativeStackNavigationOptions = {
    headerShown: false
}

export const ROUTES = {
    HOME: "home",
    PLAY: "play",
}

// the params the screens expect
export type RootStackParamListType = {
    [ROUTES.HOME]: undefined;
    [ROUTES.PLAY]: { gameMode: GAME_MODE };
};