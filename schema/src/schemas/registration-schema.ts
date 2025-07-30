import { z } from "zod";

const defaultSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

const formularioCadastroUserSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
  userText: z
    .string()
    .min(1, "Texto de usuário é obrigatório")
    .max(500, "Texto de usuário muito longo"),
});

const formularioCadastroEmpresaSchema = z.object({
  documentNumber: z
    .string()
    .min(1, "Número do documento é obrigatório")
    .max(50, "Número do documento muito longo"),
});

const cadastroSchema = defaultSchema
  .merge(formularioCadastroUserSchema)
  .merge(formularioCadastroEmpresaSchema);

export const registrationSchema = z
  .object({
    isUser: z.boolean(),
    isCompany: z.boolean(),
    formData: z.object({
      name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
      email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
      dateOfBirth: z.string().optional(),
      userText: z.string().optional(),
      documentNumber: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.isUser) {
      const userSchema = defaultSchema.merge(formularioCadastroUserSchema);
      const result = userSchema.safeParse(data.formData);
      if (!result.success) {
        result.error.issues.forEach((err) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: err.message,
            path: ["formData", ...err.path],
          });
        });
      }
    }

    if (data.isCompany) {
      const companySchema = defaultSchema.merge(formularioCadastroEmpresaSchema);
      const result = companySchema.safeParse(data.formData);
      if (!result.success) {
        result.error.issues.forEach((err) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: err.message,
            path: ["formData", ...err.path],
          });
        });
      }
    }

    if (!data.isUser && !data.isCompany) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione pelo menos um tipo (Usuário ou Empresa).",
        path: ["isUser", "isCompany"],
      });
    }
  });

export type RegistrationFormInput = z.infer<typeof registrationSchema>;
