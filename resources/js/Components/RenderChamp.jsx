import React, {useEffect, useState} from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup, Select,
    Slider,
    Switch,
    TextField
} from "@mui/material";

function RenderChamp({id, nom, type, label, options, min, max, step, defaultValue, placeholder,size,handleInputChange,data}) {

    const renderChamp = () => {
        switch (type) {
            case 'text':
                return (
                    <TextField
                        key={id}
                        label={label}
                        name={nom}
                        value={data[nom] || ''}
                        onChange={(e)=>handleInputChange(e)}
                        fullWidth
                        size={size}
                        placeholder={placeholder}
                    />
                );
            case 'checkbox':
                return (
                    <FormControlLabel
                        key={id}
                        control={
                            <Checkbox
                                name={nom}
                                checked={data[nom] || false}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: nom,
                                        value: e.target.checked
                                    }
                                })}
                                size={size}
                            />
                        }
                        label={label}
                        size={size}
                    />
                );
            case 'select':
                return (
                    <TextField
                        key={id}
                        select
                        label={label}
                        name={nom}
                        value={data[nom] || ''}
                        onChange={handleInputChange}
                        fullWidth
                        size={size}
                    >
                        {options && options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            case 'multiselect':
                return (
                    <TextField
                        key={id}
                        select
                        label={label}
                        name={nom}
                        value={data[nom] || []}
                        onChange={handleInputChange}
                        fullWidth
                        size={size}
                        SelectProps={{
                            multiple: true,
                        }}
                    >
                        {options && options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            case 'radio':
                return (
                    <FormControl component="fieldset" key={id} size={size}>
                        <FormLabel component="legend">{label}</FormLabel>
                        <RadioGroup
                            name={nom}
                            value={data[nom] || ''}
                            onChange={handleInputChange}
                        >
                            {options && options.map(option => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio size={size} />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );
            case 'slider':
                return (
                    <FormControl component="fieldset" key={id} size={size}>
                        <FormLabel component="legend">{label}</FormLabel>
                        <Slider
                            name={nom}
                            value={data[nom] || defaultValue || 0}
                            onChange={(e, newValue) => handleInputChange({
                                target: {
                                    name: nom,
                                    value: newValue
                                }
                            })}
                            aria-labelledby="input-slider"
                            min={min}
                            max={max}
                            step={step}
                            size={size}
                        />
                    </FormControl>
                );
            case 'switch':
                return (
                    <FormControlLabel
                        key={id}
                        control={
                            <Switch
                                name={nom}
                                checked={data[nom] || false}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: nom,
                                        value: e.target.checked
                                    }
                                })}
                                size={size}
                            />
                        }
                        label={label}
                        size={size}
                    />
                );
            case 'file':
                return (
                    <TextField
                        key={id}
                        label={label}
                        name={nom}
                        type="file"
                        onChange={(e) => handleInputChange({
                            target: {
                                name: nom,
                                value: e.target.files[0]
                            }
                        })}
                        fullWidth

                        size={size}
                        InputLabelProps={{ shrink: true }}
                    />
                );
            case 'color':
                return (
                    <TextField
                        key={id}
                        label={label}
                        name={nom}
                        type="color"
                        value={data[nom] || '#000000'}
                        onChange={handleInputChange}
                        fullWidth

                        size={size}
                    />
                );
            case 'richtext':
                return (
                    <RichTextEditor
                        key={id}
                        label={label}
                        name={nom}
                        value={data[""+nom] || ''}
                        onChange={(content) => handleInputChange({
                            target: {
                                name: nom,
                                value: content
                            }
                        })}
                        fullWidth

                        size={size}
                    />
                );
            // Ajouter d'autres types de champs ici si nécessaire
            default:
                return null;
        }
    };


    return (
        renderChamp()
    );
}

export default RenderChamp;
