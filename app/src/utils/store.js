import * as SecureStore from 'expo-secure-store'

export default store =  async (key, data) => {
    if(data != null){
        await SecureStore.setItemAsync(key, JSON.stringify(data))
    }
    return JSON.parse(await SecureStore.getItemAsync(key))
}
