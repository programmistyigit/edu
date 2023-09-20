import { configureStore } from "@reduxjs/toolkit";
import whoami from "./template/whoami";
import themes from "./themes";
import role from "./role";
import cityList from "./cityList";
import spaceList from "./spaceList";
import data_user from "./template/user_data";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    }),
    reducer: {
        whoami,
        themes,
        role,
        cityList,
        spaceList,
        user_data: data_user,
    }
})

export default store