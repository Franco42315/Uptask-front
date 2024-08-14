// Importamos la biblioteca Zod para la validación de esquemas
import { z } from "zod";

/** Auth & Users */
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type CheckPassword = Pick<Auth, 'password'>

/** Usuarios */
export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  _id:z.string()
})


export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email' >

export const changePasswordShcema = authSchema.pick({
  password: true,
  password_confirmation: true
}). extend({
  current_password: z.string()
})

export type UserPasswordForm = z.infer<typeof changePasswordShcema>

/** Notes */

const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
})


export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>


/** Task */

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema
  })), 
  createdAt: z.string(),
  updatedAt: z.string()
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true
})

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>

/** Projects */

// Definimos un esquema para un proyecto utilizando Zod
export const projectSchema = z.object({
  _id: z.string(), 
  projectName: z.string(), 
  clientName: z.string(),
  description: z.string(), 
  manager: z.string(userSchema.pick({_id:true})),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({_id: true})))
});

// Definimos un esquema para el dashboard que es un array de proyectos
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true, 
    projectName: true, 
    clientName: true, 
    description: true, 
    manager: true
  })
);

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true
})

// z.infer se utiliza para inferir el tipo TypeScript basado en un esquema Zod
export type Project = z.infer<typeof projectSchema>;
// Project ahora es un tipo TypeScript que tiene la misma estructura que projectSchema

// Pick es una utilidad de TypeScript que selecciona un subconjunto de propiedades de un tipo
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;
// ProjectFormData es un tipo que solo incluye projectName, clientName y description de Project

/** Team */
const teamMemberSchema = userSchema.pick({
  email:true,
  name:true,
  _id:true
})
export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>