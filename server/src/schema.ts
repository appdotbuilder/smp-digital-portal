import { z } from 'zod';

// User types enum
export const userRoleEnum = z.enum(['admin', 'editor', 'teacher', 'student']);
export type UserRole = z.infer<typeof userRoleEnum>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password_hash: z.string(),
  name: z.string(),
  role: userRoleEnum,
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// User input schemas
export const createUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  role: userRoleEnum
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginInput = z.infer<typeof loginInputSchema>;

// Content categories enum
export const contentCategoryEnum = z.enum(['school', 'education', 'achievements', 'announcement']);
export type ContentCategory = z.infer<typeof contentCategoryEnum>;

// Content/News schema
export const contentSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  category: contentCategoryEnum,
  featured_image: z.string().nullable(),
  is_published: z.boolean(),
  is_sticky: z.boolean(),
  author_id: z.number(),
  published_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Content = z.infer<typeof contentSchema>;

export const createContentInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  excerpt: z.string().nullable().optional(),
  category: contentCategoryEnum,
  featured_image: z.string().nullable().optional(),
  is_published: z.boolean().optional(),
  is_sticky: z.boolean().optional(),
  author_id: z.number()
});

export type CreateContentInput = z.infer<typeof createContentInputSchema>;

// Page schema for static content
export const pageSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  meta_description: z.string().nullable(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Page = z.infer<typeof pageSchema>;

export const createPageInputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  meta_description: z.string().nullable().optional(),
  is_published: z.boolean().optional()
});

export type CreatePageInput = z.infer<typeof createPageInputSchema>;

// Event schema
export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().nullable(),
  location: z.string().nullable(),
  category: z.string(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Event = z.infer<typeof eventSchema>;

export const createEventInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().nullable().optional(),
  location: z.string().nullable().optional(),
  category: z.string(),
  is_published: z.boolean().optional()
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;

// Gallery schema
export const galleryTypeEnum = z.enum(['photo', 'video']);
export type GalleryType = z.infer<typeof galleryTypeEnum>;

export const gallerySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  type: galleryTypeEnum,
  file_url: z.string(),
  thumbnail_url: z.string().nullable(),
  album: z.string().nullable(),
  sort_order: z.number().int(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Gallery = z.infer<typeof gallerySchema>;

export const createGalleryInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  type: galleryTypeEnum,
  file_url: z.string(),
  thumbnail_url: z.string().nullable().optional(),
  album: z.string().nullable().optional(),
  sort_order: z.number().int().optional(),
  is_published: z.boolean().optional()
});

export type CreateGalleryInput = z.infer<typeof createGalleryInputSchema>;

// SPMB (Student Registration) schema
export const spmbStatusEnum = z.enum(['pending', 'verified', 'accepted', 'rejected']);
export type SpmbStatus = z.infer<typeof spmbStatusEnum>;

export const spmbApplicationSchema = z.object({
  id: z.number(),
  student_name: z.string(),
  student_nisn: z.string(),
  birth_date: z.coerce.date(),
  birth_place: z.string(),
  gender: z.enum(['male', 'female']),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  parent_name: z.string(),
  parent_phone: z.string(),
  parent_occupation: z.string(),
  previous_school: z.string(),
  average_score: z.number(),
  documents: z.string().nullable(), // JSON string of document URLs
  status: spmbStatusEnum,
  notes: z.string().nullable(),
  submitted_at: z.coerce.date(),
  reviewed_at: z.coerce.date().nullable(),
  reviewed_by: z.number().nullable()
});

export type SpmbApplication = z.infer<typeof spmbApplicationSchema>;

export const createSpmbApplicationInputSchema = z.object({
  student_name: z.string(),
  student_nisn: z.string(),
  birth_date: z.coerce.date(),
  birth_place: z.string(),
  gender: z.enum(['male', 'female']),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  parent_name: z.string(),
  parent_phone: z.string(),
  parent_occupation: z.string(),
  previous_school: z.string(),
  average_score: z.number().min(0).max(100)
});

export type CreateSpmbApplicationInput = z.infer<typeof createSpmbApplicationInputSchema>;

// Student schema
export const studentSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  student_id: z.string(),
  class: z.string(),
  academic_year: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Student = z.infer<typeof studentSchema>;

// Teacher schema
export const teacherSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  employee_id: z.string(),
  subject: z.string(),
  position: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Teacher = z.infer<typeof teacherSchema>;

// Grade schema
export const gradeSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  teacher_id: z.number(),
  subject: z.string(),
  semester: z.string(),
  academic_year: z.string(),
  daily_score: z.number().nullable(),
  midterm_score: z.number().nullable(),
  final_score: z.number().nullable(),
  final_grade: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Grade = z.infer<typeof gradeSchema>;

export const createGradeInputSchema = z.object({
  student_id: z.number(),
  subject: z.string(),
  semester: z.string(),
  academic_year: z.string(),
  daily_score: z.number().min(0).max(100).nullable().optional(),
  midterm_score: z.number().min(0).max(100).nullable().optional(),
  final_score: z.number().min(0).max(100).nullable().optional(),
  final_grade: z.string().nullable().optional()
});

export type CreateGradeInput = z.infer<typeof createGradeInputSchema>;

// Material schema
export const materialSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  subject: z.string(),
  class: z.string(),
  file_url: z.string(),
  file_type: z.string(),
  teacher_id: z.number(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Material = z.infer<typeof materialSchema>;

export const createMaterialInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  subject: z.string(),
  class: z.string(),
  file_url: z.string(),
  file_type: z.string(),
  is_published: z.boolean().optional()
});

export type CreateMaterialInput = z.infer<typeof createMaterialInputSchema>;

// Assignment schema
export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  subject: z.string(),
  class: z.string(),
  teacher_id: z.number(),
  due_date: z.coerce.date(),
  max_score: z.number(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Assignment = z.infer<typeof assignmentSchema>;

export const createAssignmentInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  subject: z.string(),
  class: z.string(),
  due_date: z.coerce.date(),
  max_score: z.number().positive(),
  is_published: z.boolean().optional()
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentInputSchema>;

// Comment schema
export const commentSchema = z.object({
  id: z.number(),
  content_id: z.number(),
  author_name: z.string(),
  author_email: z.string().email(),
  content: z.string(),
  is_approved: z.boolean(),
  created_at: z.coerce.date()
});

export type Comment = z.infer<typeof commentSchema>;

export const createCommentInputSchema = z.object({
  content_id: z.number(),
  author_name: z.string(),
  author_email: z.string().email(),
  content: z.string()
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  is_read: z.boolean(),
  created_at: z.coerce.date()
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const createContactFormInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
});

export type CreateContactFormInput = z.infer<typeof createContactFormInputSchema>;

// Search input schema
export const searchInputSchema = z.object({
  query: z.string().min(1),
  type: z.enum(['all', 'content', 'pages', 'events']).optional()
});

export type SearchInput = z.infer<typeof searchInputSchema>;

// Filter input schemas
export const contentFilterSchema = z.object({
  category: contentCategoryEnum.optional(),
  is_published: z.boolean().optional(),
  is_sticky: z.boolean().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional()
});

export type ContentFilter = z.infer<typeof contentFilterSchema>;

export const eventFilterSchema = z.object({
  category: z.string().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  is_published: z.boolean().optional()
});

export type EventFilter = z.infer<typeof eventFilterSchema>;