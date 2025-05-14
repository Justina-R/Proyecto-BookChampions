import React, { use } from 'react'
import { useState, useEffect } from "react";

const AutoSaveForm = () => {
    const [formData, setFormData] = useState ({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
    });

    const [isLoaded, setIsLoades] = useState(false);

    const handleFormData = (newData) => {
        setFormData(newData);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        handleSetFormData({
            ...formData,
            [name]: value,
        })
    };
    
    //Vaciar el formulario
    handleClear = () => {
        const emptyForm = {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
        };
        handleSetFormData(emptyForm)
        // Borra el local storage
        localStorage.removeItem('formData')
    };

    useEffect(() => {
        const savedData = localStorage.getItem('formData')
        if(savedData) {
            // parseamos la info del local storage
            handleSetFormData(JSON.parse(savedData))
        }
    })
  return (
    <div>AutoSaveForm</div>
  )
}

export default AutoSaveForm