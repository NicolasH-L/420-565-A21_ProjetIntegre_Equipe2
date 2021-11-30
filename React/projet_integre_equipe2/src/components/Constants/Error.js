export default class Error {
    static inputErrorStyles = () => {
        return { borderColor: borderColorError, boxShadow: boxShadowError }
    }

    static inputValidStyles = () => {
        return { borderColor: borderColorValid, boxShadow: boxShadowValid }
    }

    static getInputStyles = (errorValue) => {
        return errorValue === true ? this.inputErrorStyles() : this.inputValidStyles()
    }

    static displayEmptyErrorMessage = (errorMessage) => {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h2 className="text-light">{errorMessage}</h2>
                </div>
            </div>
        )
    }

    static setErrorInputStyles = (e, isInvalid) => {
        e.target.style.borderColor = isInvalid ? borderColorError : borderColorValid
        e.target.style.boxShadow = isInvalid ? boxShadowError : boxShadowValid
    }
}

export const borderColorError = 'red'
export const borderColorValid = '#ced4da'
export const boxShadowError = '0 1px 1px red inset, 0 0 8px red'
export const boxShadowValid = 'none'
