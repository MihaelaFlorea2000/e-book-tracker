import {makeAutoObservable} from "mobx";
import axiosConfig from "../config/axiosConfig";

export default class UploadStore {

    private title: string = '';
    private authors: string[] = [];
    private description: string = '';
    private coverImageUrl: string = '';
    private coverImage: File = {} as File;
    private tags: string[] = [];
    private publisher: string = '';
    private pubDate: string = '';
    private language: string = '';
    private rating: number = 0;
    private file: File = {} as File;
    private fileName: string = '';
    private series: string = '';
    private metadataStatus: boolean = false;

    //private metadata: MetadataInterface | undefined;

    public constructor() {
        makeAutoObservable(this);
    }

    // Title
    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    // Authors
    public getAuthors(): string[] {
        return this.authors;
    }

    public setAuthors(authors: string[]) {
        this.authors = authors;
    }

    public addAuthor(author: string) {
        this.authors.push(author);
    }

    public removeAuthor(author: string) {
        this.authors.splice(this.authors.indexOf(author), 1);
    }

    public removeLastAuthor() {
        this.authors.slice(0, this.tags.length - 1)
    }

    // Description
    public getDescription(): string {
        return this.description;
    }


    public setDescription(description: string) {
        this.description = description;
    }

    // Cover Image
    public getCoverImageUrl(): string {
        return this.coverImageUrl;
    }

    public getCoverImage(): File {
        return this.coverImage;
    }

    public setCoverImageUrl(coverImageUrl: string) {
        this.coverImageUrl = coverImageUrl;
    }

    public setCoverImage(coverImage: File) {
        this.coverImage = coverImage;
    }

    // Tags
    public getTags(): string[] {
        return this.tags;
    }

    public setTags(tags: string[]) {
        this.tags = tags;
    }

    public addTag(tag: string) {
        this.tags.push(tag);
    }

    public removeLastTag() {
        this.tags.slice(0, this.tags.length - 1)
    }

    public removeTag(tag: string) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }

    // Publisher
    public getPublisher(): string {
        return this.publisher;
    }

    public setPublisher(publisher: string) {
        this.publisher = publisher;
    }

    // PubDate
    public getPubDate(): string {
        return this.pubDate;
    }

    public setPubDate(pubDate: string) {
        this.pubDate = pubDate;
    }

    // Language
    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string) {
        this.language = language;
    }

    // Rating
    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number) {
        this.rating = rating;
    }

    // File
    public getFile(): File {
        return this.file;
    }

    public setFile(file: File) {
        this.file = file;
    }

    public getFileName(): string {
        return this.fileName;
    }

    public setFileName(fileName: string) {
        this.fileName = fileName;
    }

    // Series
    public getSeries(): string {
        return this.series;
    }

    public setSeries(series: string) {
        this.series = series;
    }

    // Metadata
    public isMetadataSet(): boolean {
        return this.metadataStatus;
    }

    public setMetadataStatus(status: boolean) {
        this.metadataStatus = status;
    }

    public resetMetadata() {
        this.title = '';
        this.authors = [];
        this.description = '';
        this.coverImageUrl = '';
        this.coverImage = {} as File;
        this.tags = [];
        this.publisher = '';
        this.pubDate = '';
        this.language = '';
        this.rating = 0;
        this.file = {} as File;
        this.fileName = '';
        this.series = '';
        this.metadataStatus = false;
    }

    public uploadFiles (bookId: number) {
        const filesData = new FormData();
        filesData.append('file', this.getFile());
        filesData.append('coverImage', this.getCoverImage())
        return axiosConfig().post( `/pg/books/${bookId}/edit/upload`, filesData);
    }
}
