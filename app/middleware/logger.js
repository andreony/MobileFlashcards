const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('Action: ')
        console.log(action)
        const returnVal = next(action)
        console.log("The new state is: ", store.getState())
    console.groupEnd();
    return returnVal
}
export default logger