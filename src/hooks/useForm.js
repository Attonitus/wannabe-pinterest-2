import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState)

    const onInputChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name] : value
        })
    }

    return {
        form,
        onInputChange
    }
}