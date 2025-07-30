export interface UserData {
  name: string
  email: string
  dateOfBirth: string
  userText: string
}

export interface CompanyData {
  name: string
  email: string
  documentNumber: string
}

export interface FormData {
  name: string
  email: string
  dateOfBirth?: string
  userText?: string
  documentNumber?: string
}
