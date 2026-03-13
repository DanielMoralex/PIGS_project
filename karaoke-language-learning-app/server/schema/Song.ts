import { LangCode } from "./LangCode";
import { FileSize } from "./FileSize";

type Song = {
    id: string;
    authorId: string;
    title: string;
    language: LangCode;
    durationSeconds: number;
    size: FileSize,
    // The idea is to have two buckets, one for song files and another for lyric files
    storageKey: string;
}

export { Song };