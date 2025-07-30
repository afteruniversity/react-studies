"use client"

import { useRegistrationForm } from "@/hooks/use-registration-form"

export default function Home() {
  const {
    formData,
    isUser,
    isCompany,
    errors,
    handleInputChange,
    handleUserCheckboxChange,
    handleCompanyCheckboxChange,
    handleSubmit,
    getFieldError,
  } = useRegistrationForm()

  const commonError = getFieldError("isUser") || getFieldError("isCompany")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <div className="w-full max-w-lg rounded-lg border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Registro</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Preencha os campos abaixo para se registrar.</p>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="user-type"
                    checked={isUser}
                    onChange={handleUserCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:checked:bg-gray-50 dark:focus:ring-gray-300"
                  />
                  <label
                    htmlFor="user-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Usuário
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="company-type"
                    checked={isCompany}
                    onChange={handleCompanyCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:checked:bg-gray-50 dark:focus:ring-gray-300"
                  />
                  <label
                    htmlFor="company-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Empresa
                  </label>
                </div>
              </div>
              {commonError && <p className="text-sm text-red-500">{commonError}</p>}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                    getFieldError("name") ? "border-red-500" : ""
                  }`}
                />
                {getFieldError("name") && <p className="text-sm text-red-500">{getFieldError("name")}</p>}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                    getFieldError("email") ? "border-red-500" : ""
                  }`}
                />
                {getFieldError("email") && <p className="text-sm text-red-500">{getFieldError("email")}</p>}
              </div>
            </div>
            {isUser && (
              <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Dados de Usuário</h3>
                <div className="space-y-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth || ""}
                    onChange={handleInputChange}
                    required={isUser}
                    className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                      getFieldError("dateOfBirth") ? "border-red-500" : ""
                    }`}
                  />
                  {getFieldError("dateOfBirth") && (
                    <p className="text-sm text-red-500">{getFieldError("dateOfBirth")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="userText"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Texto de Usuário
                  </label>
                  <textarea
                    id="userText"
                    placeholder="Fale um pouco sobre você..."
                    value={formData.userText || ""}
                    onChange={handleInputChange}
                    className={`flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                      getFieldError("userText") ? "border-red-500" : ""
                    }`}
                    required={isUser}
                  />
                  {getFieldError("userText") && <p className="text-sm text-red-500">{getFieldError("userText")}</p>}
                </div>
              </div>
            )}
            {isCompany && (
              <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                <div className="space-y-2">
                  <label
                    htmlFor="documentNumber"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    N° do Documento
                  </label>
                  <input
                    id="documentNumber"
                    type="text"
                    placeholder="CNPJ ou outro documento"
                    value={formData.documentNumber || ""}
                    onChange={handleInputChange}
                    required={isCompany}
                    className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                      getFieldError("documentNumber") ? "border-red-500" : ""
                    }`}
                  />
                  {getFieldError("documentNumber") && (
                    <p className="text-sm text-red-500">{getFieldError("documentNumber")}</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-end p-0 pt-6">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 ring-offset-white transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:ring-offset-gray-950 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
