import { Post } from '../../models/Post.model';

export const DEFAULT_PROPERTY_TO_DISPLAY: keyof Post = 'title';
export const PROPERTIES_OF_POST: Array<keyof Post> = ['userId', 'id', 'title', 'body'];
