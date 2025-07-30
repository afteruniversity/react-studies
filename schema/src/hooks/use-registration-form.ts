"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { z } from "zod"
import { registrationSchema, type RegistrationFormInput } from "@/schemas/registration-schema"
import type { FormData } from "@/types/registration"

interface UseRegistrationForm {
  formData: FormData
  isUser: boolean
  isCompany: boolean
  errors: z.ZodIssue[] | null
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleUserCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCompanyCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  getFieldError: (field: keyof FormData | "isUser" | "isCompany") => string | undefined
}

export function useRegistrationForm(): UseRegistrationForm {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  })
  const [isUser, setIsUser] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [errors, setErrors] = useState<z.ZodIssue[] | null>(null)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }))
      if (errors) {
        setErrors((prevErrors) => (prevErrors ? prevErrors.filter((err) => err.path[0] !== id) : null))
      }
    },
    [errors],
  )

  const handleUserCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      setIsUser(checked)
      if (!checked) {
        setFormData((prevData) => {
          const newData = { ...prevData }
          delete newData.dateOfBirth
          delete newData.userText
          return newData
        })
      }
      if (errors) {
        setErrors((prevErrors) =>
          prevErrors
            ? prevErrors.filter(
                (err) => err.path[0] !== "dateOfBirth" && err.path[0] !== "userText" && err.path[0] !== "isUser",
              )
            : null,
        )
      }
    },
    [errors],
  )

  const handleCompanyCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      setIsCompany(checked)
      if (!checked) {
        setFormData((prevData) => {
          const newData = { ...prevData }
          delete newData.documentNumber
          return newData
        })
      }
      if (errors) {
        setErrors((prevErrors) =>
          prevErrors
            ? prevErrors.filter((err) => err.path[0] !== "documentNumber" && err.path[0] !== "isCompany")
            : null,
        )
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setErrors(null)

      const dataToValidate: RegistrationFormInput = {
        isUser,
        isCompany,
        formData: {
          ...formData,
          ...(isUser && !formData.dateOfBirth && { dateOfBirth: "" }),
          ...(isUser && !formData.userText && { userText: "" }),
          ...(isCompany && !formData.documentNumber && { documentNumber: "" }),
        },
      }
    },
    [formData, isUser, isCompany],
  )

  const getFieldError = useCallback(
    (field: keyof FormData | "isUser" | "isCompany") => {
      if (!errors) return undefined
      const error = errors.find((err) => {
        if (field === "isUser" || field === "isCompany") {
          return err.path[0] === field
        }
        return err.path[0] === "formData" && err.path[1] === field
      })
      return error?.message
    },
    [errors],
  )

  return {
    formData,
    isUser,
    isCompany,
    errors,
    handleInputChange,
    handleUserCheckboxChange,
    handleCompanyCheckboxChange,
    handleSubmit,
    getFieldError,
  }
}
