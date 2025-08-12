import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  boolean, 
  integer, 
  numeric,
  date,
  pgEnum,
  jsonb
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'editor', 'teacher', 'student']);
export const contentCategoryEnum = pgEnum('content_category', ['school', 'education', 'achievements', 'announcement']);
export const galleryTypeEnum = pgEnum('gallery_type', ['photo', 'video']);
export const spmbStatusEnum = pgEnum('spmb_status', ['pending', 'verified', 'accepted', 'rejected']);
export const genderEnum = pgEnum('gender', ['male', 'female']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: userRoleEnum('role').notNull(),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Content/News table
export const contentsTable = pgTable('contents', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  category: contentCategoryEnum('category').notNull(),
  featured_image: text('featured_image'),
  is_published: boolean('is_published').notNull().default(false),
  is_sticky: boolean('is_sticky').notNull().default(false),
  author_id: integer('author_id').notNull(),
  published_at: timestamp('published_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Pages table
export const pagesTable = pgTable('pages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  meta_description: text('meta_description'),
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Events table
export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  start_date: date('start_date').notNull(),
  end_date: date('end_date'),
  location: text('location'),
  category: text('category').notNull(),
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Gallery table
export const galleryTable = pgTable('gallery', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  type: galleryTypeEnum('type').notNull(),
  file_url: text('file_url').notNull(),
  thumbnail_url: text('thumbnail_url'),
  album: text('album'),
  sort_order: integer('sort_order').notNull().default(0),
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// SPMB Applications table
export const spmbApplicationsTable = pgTable('spmb_applications', {
  id: serial('id').primaryKey(),
  student_name: text('student_name').notNull(),
  student_nisn: text('student_nisn').notNull(),
  birth_date: date('birth_date').notNull(),
  birth_place: text('birth_place').notNull(),
  gender: genderEnum('gender').notNull(),
  address: text('address').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  parent_name: text('parent_name').notNull(),
  parent_phone: text('parent_phone').notNull(),
  parent_occupation: text('parent_occupation').notNull(),
  previous_school: text('previous_school').notNull(),
  average_score: numeric('average_score', { precision: 5, scale: 2 }).notNull(),
  documents: jsonb('documents'), // Store document URLs as JSON
  status: spmbStatusEnum('status').notNull().default('pending'),
  notes: text('notes'),
  submitted_at: timestamp('submitted_at').defaultNow().notNull(),
  reviewed_at: timestamp('reviewed_at'),
  reviewed_by: integer('reviewed_by')
});

// Students table
export const studentsTable = pgTable('students', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  student_id: text('student_id').notNull().unique(),
  class: text('class').notNull(),
  academic_year: text('academic_year').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Teachers table
export const teachersTable = pgTable('teachers', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  employee_id: text('employee_id').notNull().unique(),
  subject: text('subject').notNull(),
  position: text('position'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Grades table
export const gradesTable = pgTable('grades', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  subject: text('subject').notNull(),
  semester: text('semester').notNull(),
  academic_year: text('academic_year').notNull(),
  daily_score: numeric('daily_score', { precision: 5, scale: 2 }),
  midterm_score: numeric('midterm_score', { precision: 5, scale: 2 }),
  final_score: numeric('final_score', { precision: 5, scale: 2 }),
  final_grade: text('final_grade'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Materials table
export const materialsTable = pgTable('materials', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  subject: text('subject').notNull(),
  class: text('class').notNull(),
  file_url: text('file_url').notNull(),
  file_type: text('file_type').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Assignments table
export const assignmentsTable = pgTable('assignments', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  subject: text('subject').notNull(),
  class: text('class').notNull(),
  teacher_id: integer('teacher_id').notNull(),
  due_date: timestamp('due_date').notNull(),
  max_score: numeric('max_score', { precision: 5, scale: 2 }).notNull(),
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Comments table
export const commentsTable = pgTable('comments', {
  id: serial('id').primaryKey(),
  content_id: integer('content_id').notNull(),
  author_name: text('author_name').notNull(),
  author_email: text('author_email').notNull(),
  content: text('content').notNull(),
  is_approved: boolean('is_approved').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Contact forms table
export const contactFormsTable = pgTable('contact_forms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  is_read: boolean('is_read').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ one, many }) => ({
  student: one(studentsTable, {
    fields: [usersTable.id],
    references: [studentsTable.user_id]
  }),
  teacher: one(teachersTable, {
    fields: [usersTable.id],
    references: [teachersTable.user_id]
  }),
  contents: many(contentsTable)
}));

export const contentsRelations = relations(contentsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [contentsTable.author_id],
    references: [usersTable.id]
  }),
  comments: many(commentsTable)
}));

export const studentsRelations = relations(studentsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [studentsTable.user_id],
    references: [usersTable.id]
  }),
  grades: many(gradesTable)
}));

export const teachersRelations = relations(teachersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [teachersTable.user_id],
    references: [usersTable.id]
  }),
  grades: many(gradesTable),
  materials: many(materialsTable),
  assignments: many(assignmentsTable)
}));

export const gradesRelations = relations(gradesTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [gradesTable.student_id],
    references: [studentsTable.id]
  }),
  teacher: one(teachersTable, {
    fields: [gradesTable.teacher_id],
    references: [teachersTable.id]
  })
}));

export const materialsRelations = relations(materialsTable, ({ one }) => ({
  teacher: one(teachersTable, {
    fields: [materialsTable.teacher_id],
    references: [teachersTable.id]
  })
}));

export const assignmentsRelations = relations(assignmentsTable, ({ one }) => ({
  teacher: one(teachersTable, {
    fields: [assignmentsTable.teacher_id],
    references: [teachersTable.id]
  })
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  content: one(contentsTable, {
    fields: [commentsTable.content_id],
    references: [contentsTable.id]
  })
}));

export const spmbApplicationsRelations = relations(spmbApplicationsTable, ({ one }) => ({
  reviewer: one(usersTable, {
    fields: [spmbApplicationsTable.reviewed_by],
    references: [usersTable.id]
  })
}));

// Export all tables for drizzle queries
export const tables = {
  users: usersTable,
  contents: contentsTable,
  pages: pagesTable,
  events: eventsTable,
  gallery: galleryTable,
  spmbApplications: spmbApplicationsTable,
  students: studentsTable,
  teachers: teachersTable,
  grades: gradesTable,
  materials: materialsTable,
  assignments: assignmentsTable,
  comments: commentsTable,
  contactForms: contactFormsTable
};

// TypeScript types for the tables
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Content = typeof contentsTable.$inferSelect;
export type NewContent = typeof contentsTable.$inferInsert;

export type Page = typeof pagesTable.$inferSelect;
export type NewPage = typeof pagesTable.$inferInsert;

export type Event = typeof eventsTable.$inferSelect;
export type NewEvent = typeof eventsTable.$inferInsert;

export type Gallery = typeof galleryTable.$inferSelect;
export type NewGallery = typeof galleryTable.$inferInsert;

export type SpmbApplication = typeof spmbApplicationsTable.$inferSelect;
export type NewSpmbApplication = typeof spmbApplicationsTable.$inferInsert;

export type Student = typeof studentsTable.$inferSelect;
export type NewStudent = typeof studentsTable.$inferInsert;

export type Teacher = typeof teachersTable.$inferSelect;
export type NewTeacher = typeof teachersTable.$inferInsert;

export type Grade = typeof gradesTable.$inferSelect;
export type NewGrade = typeof gradesTable.$inferInsert;

export type Material = typeof materialsTable.$inferSelect;
export type NewMaterial = typeof materialsTable.$inferInsert;

export type Assignment = typeof assignmentsTable.$inferSelect;
export type NewAssignment = typeof assignmentsTable.$inferInsert;

export type Comment = typeof commentsTable.$inferSelect;
export type NewComment = typeof commentsTable.$inferInsert;

export type ContactForm = typeof contactFormsTable.$inferSelect;
export type NewContactForm = typeof contactFormsTable.$inferInsert;