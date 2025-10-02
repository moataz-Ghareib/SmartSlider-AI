import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, setDoc, Timestamp } from 'firebase/firestore';

export interface AcademyArticle {
  id: string;
  title: string;
  slug: string;
  category: 'articles' | 'laws' | 'success-stories' | 'trends';
  summary?: string;
  tags?: string[];
  updatedAt?: Date;
}

const colRefs = {
  articles: collection(db, 'academy_articles'),
  laws: collection(db, 'academy_laws'),
  success: collection(db, 'academy_success'),
  trends: collection(db, 'academy_trends'),
};

export async function listAcademyItems(kind: keyof typeof colRefs, tag?: string): Promise<AcademyArticle[]> {
  const base = colRefs[kind];
  const q = tag ? query(base, where('tags', 'array-contains', tag)) : base;
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      summary: data.summary,
      tags: data.tags,
      updatedAt: data.updatedAt?.toDate?.() ?? undefined,
    } as AcademyArticle;
  });
}

export async function getAcademyItem(kind: keyof typeof colRefs, idOrSlug: string): Promise<AcademyArticle | null> {
  // Prefer document by id
  const ref = doc(colRefs[kind], idOrSlug);
  const byId = await getDoc(ref);
  if (byId.exists()) {
    const data = byId.data() as any;
    return {
      id: byId.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      summary: data.summary,
      tags: data.tags,
      updatedAt: data.updatedAt?.toDate?.() ?? undefined,
    } as AcademyArticle;
  }
  // Fallback to slug query
  const snap = await getDocs(query(colRefs[kind], where('slug', '==', idOrSlug)));
  const d = snap.docs[0];
  if (!d) return null;
  const data = d.data() as any;
  return {
    id: d.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    summary: data.summary,
    tags: data.tags,
    updatedAt: data.updatedAt?.toDate?.() ?? undefined,
  } as AcademyArticle;
}

export async function upsertAcademyItem(kind: keyof typeof colRefs, item: Omit<AcademyArticle, 'id'> & { id?: string }) {
  const id = item.id || item.slug;
  await setDoc(doc(colRefs[kind], id), {
    title: item.title,
    slug: item.slug,
    category: item.category,
    summary: item.summary ?? '',
    tags: item.tags ?? [],
    updatedAt: Timestamp.fromDate(item.updatedAt ?? new Date()),
  }, { merge: true });
}


