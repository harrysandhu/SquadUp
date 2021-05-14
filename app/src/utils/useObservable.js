import React from "react"
import { Observable } from "rxjs"


/**
 * React hook to make using model observable objects easy to bind to react components.
 * @param {Observable} observable
 * @param {*} initial
 */
export default (observable, initial) => {

    const [value, setValue] = React.useState(
        initial ? initial : observable.getValue())

    
    // set value e
    React.useEffect(() => {
        // subscription handles the new value for the observable, 
        // on value (next(value)) do setValue and update component state.
        const subscription = observable.subscribe(value => setValue(value))
        // clean
        return () => subscription.subscription()

    }, [])
}

