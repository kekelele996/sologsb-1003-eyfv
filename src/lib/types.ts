export type SegmentKind = 'heading' | 'paragraph' | 'code' | 'link' | 'variable'
export type SegmentStatus = 'draft' | 'needs-work' | 'confirmed' | 'returned'
export type IssueType = 'missing-translation' | 'missing-variable' | 'link-mismatch' | 'glossary' | 'code-format'
export type IssueSeverity = 'error' | 'warning'

export interface Segment {
  id: string
  index: number
  kind: SegmentKind
  sourceText: string
  targetText: string
  status: SegmentStatus
  protectedTokens: string[]
  note: string
  /** 术语调整导致由“已确认”重开时，记录触发调整的术语 ID。 */
  reopenedTermId?: string
  /** 重开时该术语的旧译名，用于问题区对照展示。 */
  reopenedPrevious?: string
  reopenedAt?: number
}

export interface GlossaryRevision {
  id: string
  sourceBefore: string
  targetBefore: string
  sourceAfter: string
  targetAfter: string
  reason: string
  author: string
  createdAt: number
}

export interface GlossaryTerm {
  id: string
  source: string
  target: string
  caseSensitive: boolean
  note: string
  /** 每次译名调整留下的版本记录，按时间先后排列。 */
  revisions: GlossaryRevision[]
}

export interface Discussion {
  id: string
  segmentId: string
  author: string
  body: string
  resolved: boolean
  createdAt: number
}

export interface TranslationIssue {
  id: string
  segmentId: string
  type: IssueType
  severity: IssueSeverity
  message: string
  expected?: string
  /** 术语调整前的旧译名（存在时问题区同时展示旧译名与当前要求）。 */
  previous?: string
}

export type HistoryAction = 'edit' | 'confirm' | 'return' | 'resolve-conflict' | 'import' | 'discussion' | 'glossary-change'

export interface HistoryEntry {
  id: string
  /** 普通操作对应片段 ID；术语调整对应术语 ID。 */
  segmentId: string
  author: string
  action: HistoryAction
  before: string
  after: string
  /** 退回意见或术语调整原因。 */
  reason?: string
  /** 关联的术语 ID：术语调整本身，或针对被重开片段的确认/退回。 */
  termId?: string
  /** 术语调整后由“已确认”转为待处理的片段 ID 列表。 */
  reopenedSegmentIds?: string[]
  createdAt: number
}

export interface TranslationConflict {
  id: string
  segmentId: string
  localText: string
  remoteText: string
  remoteAuthor: string
  createdAt: number
}

export interface LocalizationDocument {
  id: string
  title: string
  sourceFile: string
  sourceLanguage: string
  targetLanguage: string
  updatedAt: number
  segments: Segment[]
  glossary: GlossaryTerm[]
  discussions: Discussion[]
}
