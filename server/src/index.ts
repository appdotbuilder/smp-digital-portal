import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import all schemas
import {
  loginInputSchema,
  createUserInputSchema,
  createContentInputSchema,
  contentFilterSchema,
  createPageInputSchema,
  createEventInputSchema,
  eventFilterSchema,
  createGalleryInputSchema,
  createSpmbApplicationInputSchema,
  createGradeInputSchema,
  createMaterialInputSchema,
  createAssignmentInputSchema,
  createCommentInputSchema,
  createContactFormInputSchema,
  searchInputSchema
} from './schema';

// Import all handlers
import { loginUser, createUser, verifyToken } from './handlers/auth';
import { 
  createContent, 
  getContents, 
  getContentBySlug, 
  updateContent, 
  deleteContent, 
  getFeaturedContents,
  getLatestContents 
} from './handlers/content';
import { 
  createPage, 
  getPages, 
  getPageBySlug, 
  updatePage, 
  deletePage 
} from './handlers/pages';
import { 
  createEvent, 
  getEvents, 
  getUpcomingEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent,
  getEventsByDateRange 
} from './handlers/events';
import { 
  createGalleryItem, 
  getGalleryItems, 
  getGalleryAlbums, 
  getGalleryItemById, 
  updateGalleryItem, 
  deleteGalleryItem,
  reorderGalleryItems 
} from './handlers/gallery';
import { 
  createSpmbApplication, 
  getSpmbApplications, 
  getSpmbApplicationById, 
  updateSpmbApplicationStatus,
  exportSpmbApplications,
  getSpmbStatistics,
  uploadSpmbDocuments 
} from './handlers/spmb';
import { 
  getStudentProfile, 
  getStudentGrades, 
  getStudentMaterials, 
  getStudentAssignments,
  getStudentsByClass,
  updateStudentProfile 
} from './handlers/students';
import { 
  getTeacherProfile, 
  createGrade, 
  updateGrade, 
  getTeacherGrades,
  createMaterial,
  getTeacherMaterials,
  updateMaterial,
  deleteMaterial,
  createAssignment,
  getTeacherAssignments,
  updateAssignment,
  deleteAssignment 
} from './handlers/teachers';
import { 
  createComment, 
  getCommentsByContentId, 
  getPendingComments, 
  approveComment, 
  rejectComment,
  getCommentById 
} from './handlers/comments';
import { 
  createContactForm, 
  getContactForms, 
  getContactFormById, 
  markContactFormAsRead, 
  deleteContactForm,
  getContactFormStatistics 
} from './handlers/contact';
import { 
  searchContent, 
  searchContentOnly, 
  searchPages, 
  searchEvents,
  getSearchSuggestions 
} from './handlers/search';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Authentication routes
  auth: router({
    login: publicProcedure
      .input(loginInputSchema)
      .mutation(({ input }) => loginUser(input)),
    
    register: publicProcedure
      .input(createUserInputSchema)
      .mutation(({ input }) => createUser(input)),
    
    verify: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(({ input }) => verifyToken(input.token)),
  }),

  // Content/News routes
  content: router({
    create: publicProcedure
      .input(createContentInputSchema)
      .mutation(({ input }) => createContent(input)),
    
    list: publicProcedure
      .input(contentFilterSchema.optional())
      .query(({ input }) => getContents(input)),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getContentBySlug(input.slug)),
    
    update: publicProcedure
      .input(z.object({ id: z.number(), data: createContentInputSchema.partial() }))
      .mutation(({ input }) => updateContent(input.id, input.data)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteContent(input.id)),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => getFeaturedContents(input?.limit)),
    
    latest: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => getLatestContents(input?.limit)),
  }),

  // Pages routes
  pages: router({
    create: publicProcedure
      .input(createPageInputSchema)
      .mutation(({ input }) => createPage(input)),
    
    list: publicProcedure
      .query(() => getPages()),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getPageBySlug(input.slug)),
    
    update: publicProcedure
      .input(z.object({ id: z.number(), data: createPageInputSchema.partial() }))
      .mutation(({ input }) => updatePage(input.id, input.data)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deletePage(input.id)),
  }),

  // Events routes
  events: router({
    create: publicProcedure
      .input(createEventInputSchema)
      .mutation(({ input }) => createEvent(input)),
    
    list: publicProcedure
      .input(eventFilterSchema.optional())
      .query(({ input }) => getEvents(input)),
    
    upcoming: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => getUpcomingEvents(input?.limit)),
    
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getEventById(input.id)),
    
    byDateRange: publicProcedure
      .input(z.object({ 
        startDate: z.coerce.date(), 
        endDate: z.coerce.date() 
      }))
      .query(({ input }) => getEventsByDateRange(input.startDate, input.endDate)),
    
    update: publicProcedure
      .input(z.object({ id: z.number(), data: createEventInputSchema.partial() }))
      .mutation(({ input }) => updateEvent(input.id, input.data)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteEvent(input.id)),
  }),

  // Gallery routes
  gallery: router({
    create: publicProcedure
      .input(createGalleryInputSchema)
      .mutation(({ input }) => createGalleryItem(input)),
    
    list: publicProcedure
      .input(z.object({ 
        type: z.enum(['photo', 'video']).optional(),
        album: z.string().optional() 
      }))
      .query(({ input }) => getGalleryItems(input?.type, input?.album)),
    
    albums: publicProcedure
      .query(() => getGalleryAlbums()),
    
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getGalleryItemById(input.id)),
    
    update: publicProcedure
      .input(z.object({ id: z.number(), data: createGalleryInputSchema.partial() }))
      .mutation(({ input }) => updateGalleryItem(input.id, input.data)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteGalleryItem(input.id)),
    
    reorder: publicProcedure
      .input(z.array(z.object({ id: z.number(), sort_order: z.number() })))
      .mutation(({ input }) => reorderGalleryItems(input)),
  }),

  // SPMB routes
  spmb: router({
    apply: publicProcedure
      .input(createSpmbApplicationInputSchema)
      .mutation(({ input }) => createSpmbApplication(input)),
    
    list: publicProcedure
      .input(z.object({ 
        status: z.enum(['pending', 'verified', 'accepted', 'rejected']).optional() 
      }))
      .query(({ input }) => getSpmbApplications(input?.status)),
    
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getSpmbApplicationById(input.id)),
    
    updateStatus: publicProcedure
      .input(z.object({ 
        id: z.number(),
        status: z.enum(['pending', 'verified', 'accepted', 'rejected']),
        notes: z.string().optional(),
        reviewerId: z.number().optional()
      }))
      .mutation(({ input }) => updateSpmbApplicationStatus(
        input.id, 
        input.status, 
        input.notes, 
        input.reviewerId
      )),
    
    export: publicProcedure
      .input(z.object({ format: z.enum(['xlsx', 'csv']).optional() }))
      .query(({ input }) => exportSpmbApplications(input?.format)),
    
    statistics: publicProcedure
      .query(() => getSpmbStatistics()),
    
    uploadDocuments: publicProcedure
      .input(z.object({ 
        applicationId: z.number(),
        documents: z.array(z.string()) 
      }))
      .mutation(({ input }) => uploadSpmbDocuments(input.applicationId, input.documents)),
  }),

  // Student routes
  students: router({
    profile: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ input }) => getStudentProfile(input.userId)),
    
    grades: publicProcedure
      .input(z.object({ 
        studentId: z.number(),
        semester: z.string().optional(),
        academicYear: z.string().optional()
      }))
      .query(({ input }) => getStudentGrades(
        input.studentId, 
        input.semester, 
        input.academicYear
      )),
    
    materials: publicProcedure
      .input(z.object({ 
        studentId: z.number(),
        subject: z.string().optional()
      }))
      .query(({ input }) => getStudentMaterials(input.studentId, input.subject)),
    
    assignments: publicProcedure
      .input(z.object({ 
        studentId: z.number(),
        subject: z.string().optional()
      }))
      .query(({ input }) => getStudentAssignments(input.studentId, input.subject)),
    
    byClass: publicProcedure
      .input(z.object({ 
        className: z.string(),
        academicYear: z.string()
      }))
      .query(({ input }) => getStudentsByClass(input.className, input.academicYear)),
    
    updateProfile: publicProcedure
      .input(z.object({ 
        id: z.number(),
        data: z.object({
          class: z.string().optional(),
          academic_year: z.string().optional()
        })
      }))
      .mutation(({ input }) => updateStudentProfile(input.id, input.data)),
  }),

  // Teacher routes
  teachers: router({
    profile: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ input }) => getTeacherProfile(input.userId)),
    
    createGrade: publicProcedure
      .input(z.object({ 
        data: createGradeInputSchema,
        teacherId: z.number()
      }))
      .mutation(({ input }) => createGrade(input.data, input.teacherId)),
    
    updateGrade: publicProcedure
      .input(z.object({ 
        gradeId: z.number(),
        data: createGradeInputSchema.partial()
      }))
      .mutation(({ input }) => updateGrade(input.gradeId, input.data)),
    
    grades: publicProcedure
      .input(z.object({ 
        teacherId: z.number(),
        subject: z.string().optional(),
        className: z.string().optional()
      }))
      .query(({ input }) => getTeacherGrades(
        input.teacherId, 
        input.subject, 
        input.className
      )),
    
    createMaterial: publicProcedure
      .input(z.object({ 
        data: createMaterialInputSchema,
        teacherId: z.number()
      }))
      .mutation(({ input }) => createMaterial(input.data, input.teacherId)),
    
    materials: publicProcedure
      .input(z.object({ 
        teacherId: z.number(),
        subject: z.string().optional()
      }))
      .query(({ input }) => getTeacherMaterials(input.teacherId, input.subject)),
    
    updateMaterial: publicProcedure
      .input(z.object({ 
        materialId: z.number(),
        data: createMaterialInputSchema.partial()
      }))
      .mutation(({ input }) => updateMaterial(input.materialId, input.data)),
    
    deleteMaterial: publicProcedure
      .input(z.object({ materialId: z.number() }))
      .mutation(({ input }) => deleteMaterial(input.materialId)),
    
    createAssignment: publicProcedure
      .input(z.object({ 
        data: createAssignmentInputSchema,
        teacherId: z.number()
      }))
      .mutation(({ input }) => createAssignment(input.data, input.teacherId)),
    
    assignments: publicProcedure
      .input(z.object({ 
        teacherId: z.number(),
        subject: z.string().optional()
      }))
      .query(({ input }) => getTeacherAssignments(input.teacherId, input.subject)),
    
    updateAssignment: publicProcedure
      .input(z.object({ 
        assignmentId: z.number(),
        data: createAssignmentInputSchema.partial()
      }))
      .mutation(({ input }) => updateAssignment(input.assignmentId, input.data)),
    
    deleteAssignment: publicProcedure
      .input(z.object({ assignmentId: z.number() }))
      .mutation(({ input }) => deleteAssignment(input.assignmentId)),
  }),

  // Comments routes
  comments: router({
    create: publicProcedure
      .input(createCommentInputSchema)
      .mutation(({ input }) => createComment(input)),
    
    byContent: publicProcedure
      .input(z.object({ 
        contentId: z.number(),
        approved: z.boolean().optional()
      }))
      .query(({ input }) => getCommentsByContentId(input.contentId, input.approved)),
    
    pending: publicProcedure
      .query(() => getPendingComments()),
    
    approve: publicProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(({ input }) => approveComment(input.commentId)),
    
    reject: publicProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(({ input }) => rejectComment(input.commentId)),
    
    byId: publicProcedure
      .input(z.object({ commentId: z.number() }))
      .query(({ input }) => getCommentById(input.commentId)),
  }),

  // Contact routes
  contact: router({
    submit: publicProcedure
      .input(createContactFormInputSchema)
      .mutation(({ input }) => createContactForm(input)),
    
    list: publicProcedure
      .input(z.object({ unreadOnly: z.boolean().optional() }))
      .query(({ input }) => getContactForms(input?.unreadOnly)),
    
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getContactFormById(input.id)),
    
    markAsRead: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => markContactFormAsRead(input.id)),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteContactForm(input.id)),
    
    statistics: publicProcedure
      .query(() => getContactFormStatistics()),
  }),

  // Search routes
  search: router({
    all: publicProcedure
      .input(searchInputSchema)
      .query(({ input }) => searchContent(input)),
    
    content: publicProcedure
      .input(z.object({ 
        query: z.string(),
        limit: z.number().optional()
      }))
      .query(({ input }) => searchContentOnly(input.query, input.limit)),
    
    pages: publicProcedure
      .input(z.object({ 
        query: z.string(),
        limit: z.number().optional()
      }))
      .query(({ input }) => searchPages(input.query, input.limit)),
    
    events: publicProcedure
      .input(z.object({ 
        query: z.string(),
        limit: z.number().optional()
      }))
      .query(({ input }) => searchEvents(input.query, input.limit)),
    
    suggestions: publicProcedure
      .input(z.object({ 
        query: z.string(),
        limit: z.number().optional()
      }))
      .query(({ input }) => getSearchSuggestions(input.query, input.limit)),
  }),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();