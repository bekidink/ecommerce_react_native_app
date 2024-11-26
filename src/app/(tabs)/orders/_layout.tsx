import { Stack } from "expo-router";

export default function ordersRootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
        </Stack>
    )
}