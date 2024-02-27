import { Dispatch, SetStateAction } from "react"

export interface SearchProps {
    title: string
}

export interface FilterProps {
    type: string
}

export interface CarCardProps {
    variant?: string
    getAllCars?: any
    car?: any
}

export interface EditCarFormProps {
    carID: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}