import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const agentLogs = pgTable('agent_logs', {
    id: serial('id').primaryKey(),
    taskId: text('task_id').notNull().references(() => tasks.taskId),
    agentName: text('agent_name').notNull(),
    status: text('status').notNull(), // 'success', 'failed', 'running'
    result: jsonb('result'),
    error: text('error'),
    duration: integer('duration'), // milliseconds
    iteration: integer('iteration').default(0),
    createdAt: timestamp('created_at').defaultNow(),
  });